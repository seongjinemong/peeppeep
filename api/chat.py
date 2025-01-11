from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

# MongoDB 연결
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]
UserCollection = db['User']
ChatCollection = db['Chat']

app = FastAPI()

# CORS 설정 (프론트엔드 연결을 위해 필요)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 연결된 클라이언트 정보를 저장하는 딕셔너리
connected_clients = {}

# 클라이언트 정보를 MongoDB에서 가져오는 함수
async def get_client_info(client_id: str):
    return await UserCollection.find_one({"client_id": client_id})

# 메시지 저장 함수
async def save_message(sender_id, receiver_id, message):
    message_data = {
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "message": message
    }
    await ChatCollection.insert_one(message_data)

# WebSocket 핸들러 (2인 채팅)
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    # 클라이언트 연결 수락
    await websocket.accept()
    connected_clients[client_id] = websocket

    # 클라이언트 정보 확인
    client_info = await get_client_info(client_id)
    if not client_info:
        await websocket.send_text("클라이언트 정보를 찾을 수 없습니다.")
        await websocket.close()
        return

    try:
        while True:
            # 메시지 수신 및 파싱
            data = await websocket.receive_text()
            data_parts = data.split(":", 1)  # "receiver_id:message" 형식
            if len(data_parts) == 2:
                receiver_id, message = data_parts
                # MongoDB에 메시지 저장
                await save_message(client_id, receiver_id, message)

                # 메시지 전송 (상대방이 연결되어 있는 경우만)
                if receiver_id in connected_clients:
                    await connected_clients[receiver_id].send_text(f"{client_id}: {message}")
                else:
                    await websocket.send_text(f"{receiver_id}님이 현재 오프라인입니다.")
            else:
                await websocket.send_text("잘못된 메시지 형식입니다.")
    except WebSocketDisconnect:
        print(f"{client_id} disconnected.")
    finally:
        del connected_clients[client_id]

# 과거 대화 내역 조회 엔드포인트
@app.get("/chat/{client_id1}/{client_id2}")
async def get_chat_history(client_id1: str, client_id2: str):
    chat_history = await ChatCollection.find({
        "$or": [
            {"sender_id": client_id1, "receiver_id": client_id2},
            {"sender_id": client_id2, "receiver_id": client_id1}
        ]
    }).to_list(length=100)
    return chat_history

# 클라이언트 정보 조회 엔드포인트
@app.get("/client/{client_id}")
async def fetch_client_info(client_id: str):
    client_info = await get_client_info(client_id)
    if client_info:
        return client_info
    return {"error": "Client not found"}

# FastAPI 서버 실행 (터미널에서 실행 필요)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)