from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pydantic import BaseModel, Field
import json
import trafilatura
from openai import AsyncOpenAI
from dotenv import load_dotenv
import os
import uvicorn

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]  # MongoDB 데이터베이스 선택
FeedCollection = db['Feed'] 
UserCollection = db['User']

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
                        "text": """
                        블로그 내용에서 제목, 주요 내용, URL, 태그 등을 추출합니다. 
                        
                        # Steps
                        
                        1. **제목 추출**: 블로그 내용에서 명확한 제목을 찾고, 이를 추출합니다. 20자를 절대 넘어서는 안됩니다.
                        2. **주요 내용 식별**: 전체 내용을 분석하여 요약해주세요. 
                        3. **URL 찾기**: 블로그 내용 중에 포함된 URL을 추출합니다.
                        4. **태그 추출**: 내용 중에서 관련된 주제나 키워드를 기반으로 적절한 태그를 생성합니다. 태그는 피그마, 리엑트, fastapi, 자바, 타입스트립트 중 해당하는 것만 출력해주세요.

                        # Output Format
                        
                        결과는 JSON 형식으로 제공합니다. 다음과 같은 구조를 따릅니다:
                        - \"title\": 문자열 - 추출한 제목
                        - \"summary\": 문자열 - 주요 내용 또는 요약
                        - \"url\": 문자열 또는 빈 문자열 - 추출한 URL
                        - \"tags\": 문자열 배열 - 생성한 태그 목록
                        """
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

@app.get("/feeds", response_model=FeedResponse)
async def get_all_feeds():
    try:
        print('=====get_all_feeds=====')
        data = await FeedCollection.find().to_list(100)
        print('=====data=====', data)
        feeds = await FeedCollection.find().sort([('id', -1)]).to_list(100)  # 최신순으로 100개 조회
        print('=====feeds=====', feeds)
        feeds = [{**feed, "_id": str(feed["_id"])} for feed in feeds]
        print('=====changed feeds=====', feeds)
        return FeedResponse(
                status=200,
                message="success",
                body=feeds
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

class Comment(BaseModel):
    userId: str
    userName: str
    userImageUrl: str
    comment: str
    likes: int
    created_at: str

class Feed(BaseModel):
    id: Optional[ObjectId] = Field(alias="_id", default=None)
    userId: str
    title: str
    description: str
    image_url: str
    topic: str
    tags: list[str]
    question: Optional[str] = ""
    created_at: str
    updated_at: str
    comments: list[Comment] = []

    class Config:
        arbitrary_types_allowed = True

# @app.get("/feed/{feed_id}/comment/", response_model=Comment)
# async def get_latest_comment(feed_id: str):
#     try:
#         feed = await collection.find_one({"_id": ObjectId(feed_id)})
#         latest_comment = feed["comments"][-1]
#         return Comment(**latest_comment)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

@app.post("/feed/", response_model=Feed)
async def create_feed(feed: Feed):
    try:
        feed_dict = feed.model_dump()
        feed_dict["_id"] = ObjectId()
        await collection.insert_one(feed_dict)
        return Feed(**feed_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# @app.put("/feed/{feed_id}/", response_model=Feed)
# async def update_feed(feed_id: str, feed: Feed):\]
#     try:
#         await collection.update_one({"_id": ObjectId(feed_id)}, {"$set": feed.dict()})
#         updated_feed = await collection.find_one({"_id": ObjectId(feed_id)})
#         return Feed(**updated_feed)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

# @app.delete("/feed/{feed_id}/")
# async def delete_feed(feed_id: str):
#     try:
#         await collection.delete_one({"_id": ObjectId(feed_id)})
#         return {"message": "Feed deleted successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)