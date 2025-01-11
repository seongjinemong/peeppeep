from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import json
import trafilatura
from openai import AsyncOpenAI
from dotenv import load_dotenv
import os


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]  # MongoDB 데이터베이스 선택
collection = db['Feed']    # blogs라는 컬렉션 생성

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],  # 모든 메서드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 헤더 허용
)

client = AsyncOpenAI()

def extract_blog_content(url: str) -> str:
    downloaded = trafilatura.fetch_url(url)
    if not downloaded:
        raise ValueError("Failed to download content from the provided URL.")
    contents = trafilatura.extract(
        downloaded, output_format="json",
        include_comments=False, include_links=False, with_metadata=True,
        date_extraction_params={'extensive_search': True, 'original_date': True, 'max_date': None},
    )
    json_output = json.loads(contents)
    return json_output['text']

async def analyze_blog_content(text: str) -> dict:
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "블로그 내용에서 제목, 주요 내용, URL, 태그 등을 추출합니다. 제목의 길이는 20자를 절대 넘어서는 안됩니다. 태그는 피그마, 리엑트, fastapi, 자바, 타입스트립트 중 해당하는 것만 출력해주세요."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": text
                    }
                ]
            }
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "blog_extraction",
                "schema": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "summary": {"type": "string"},
                    "url": {"type": "string"},
                    "tags": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["title", "summary", "url", "tags"],
                "additionalProperties": False
            }
        }
        },
        temperature=1,
        max_completion_tokens=2048
    )
    return response.choices[0].message.content

class BlogRequest(BaseModel):
    url: str

class BlogResponse(BaseModel):
    status: int
    message: str
    body: dict

@app.post("/analyze-blog/", response_model=BlogResponse)
async def analyze_blog(request: BlogRequest):
    try:
        blog_text = extract_blog_content(request.url)
        analysis_result = await analyze_blog_content(blog_text)  # ✅ 비동기 호출로 변경
        result_data = json.loads(analysis_result)

        # ✅ MongoDB에 데이터 저장
        # insert_result = await collection.insert_one(result_data)
        
        # ✅ 성공 메시지와 함께 MongoDB의 문서 ID 반환
        return BlogResponse(
            status=200,
            message="success",
            body=result_data
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

class FeedResponse(BaseModel):
    status: int
    message: str
    body: list[dict]

@app.get("/feeds/", response_model=FeedResponse)
async def get_all_feeds():
    try:
        feeds = await collection.find().to_list(100)  # 최대 100개 조회
        # 각 피드를 변환하여 _id를 문자열로 변경
        feeds = [{**feed, "_id": str(feed["_id"])} for feed in feeds]
        return FeedResponse(
                status=200,
                message="success",
                body=feeds
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))