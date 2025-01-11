from typing import Optional, List
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
from datetime import datetime

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

dbclient = AsyncIOMotorClient(MONGO_URI)
db = dbclient[MONGO_DB_NAME]
FeedCollection = db['Feed']
UserCollection = db['User']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncOpenAI()

# MongoDB의 날짜 형식을 처리하기 위한 기본 모델
class MongoDatetime(BaseModel):
    """MongoDB의 $date 형식을 처리하기 위한 커스텀 모델"""
    date: datetime

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, dict) and '$date' in v:
            return cls(date=datetime.fromisoformat(v['$date'].replace('Z', '+00:00')))
        if isinstance(v, datetime):
            return cls(date=v)
        raise ValueError('Invalid datetime format')

class Comment(BaseModel):
    #id: Optional[ObjectId] = Field(alias="_id", default=None)
    userId: str
    content: str
    likedUser: List[str] = []
    created_at: MongoDatetime = Field(default_factory=lambda: MongoDatetime(date=datetime.utcnow()))

    class Config:
        json_encoders = {
            ObjectId: str,
            MongoDatetime: lambda v: {'$date': v.date.isoformat() + "Z"},
            datetime: lambda v: v.isoformat() + "Z"
        }
        
class CommentwithId(Comment):
    id: Optional[str] = Field(alias="_id", default=None)

class Feed(BaseModel):
    #id: Optional[ObjectId] = Field(alias="_id", default=None)
    userId: str
    title: str
    description: str
    imageUrl: str
    topic: str
    tags: List[str]
    question: Optional[str] = ""
    created_at: MongoDatetime = Field(default_factory=lambda: MongoDatetime(date=datetime.utcnow()))
    updated_at: MongoDatetime = Field(default_factory=lambda: MongoDatetime(date=datetime.utcnow()))
    comment: List[Comment] = []

    class Config:
        json_encoders = {
            ObjectId: str,
            MongoDatetime: lambda v: {'$date': v.date.isoformat() + "Z"},
            datetime: lambda v: v.isoformat() + "Z"
        }
        
class FeedwithId(Feed):
    id: Optional[str] = Field(alias="_id", default=None)
    comment: List[CommentwithId] = []

# API 응답 모델
class BlogRequest(BaseModel):
    url: str

class BlogResponse(BaseModel):
    status: int
    message: str
    body: dict

class FeedResponse(BaseModel):
    status: int
    message: str
    body: List[dict]

# 블로그 분석 함수들
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
                "content": """블로그 내용에서 제목, 주요 내용, URL, 태그 등을 추출합니다.\n\n
                # Steps\n
                1. 제목 추출: 블로그 내용에서 명확한 제목을 찾고, 이를 추출합니다. 20자를 절대 넘어서는 안됩니다.\n
                2. 주요 내용 식별: 전체 내용을 분석하여 요약해주세요.\n
                3. topic 찾기: 블로그 내용을 대표할 수 있는 topic을 추출합니다.단, topic은 다음 중 하나여야 합니다. \n React, Vue, Angular, Next.js, TypeScript, JavaScript, HTML/CSS, Tailwind, SASS/SCSS, Redux, Recoil, Zustand, React Query, Webpack, Vite, Node.js, Express, NestJS, Spring, Django, FastAPI, Flask, Laravel, Ruby on Rails, ASP.NET, MySQL, PostgreSQL, MongoDB, Redis, Firebase, Supabase, React Native, Flutter, Swift, Kotlin, iOS, Android, AWS, Docker, Kubernetes, Jenkins, GitHub Actions, Nginx, Linux, Git, GraphQL, WebSocket, REST API, Prisma, Elasticsearch, WebRTC, Jest, Cypress, Vitest, Selenium, Postman, Vercel, Netlify, Heroku, GCP, Azure, BFS, DFS, Dynamic Programming, Greedy, Binary Search, Hash Table, Stack, Queue, Heap, Tree, Graph, Sorting, Two Pointers, Sliding Window, BackTracking, Recursion, Data Structure, Network, Operating System, Database, Computer Architecture, Compiler, Memory Management, Process/Thread, TCP/IP, HTTP, Design Pattern, Agile, Scrum, TDD, DDD, MSA, Clean Code, Refactoring, OOP, Functional Programming, CI/CD, Web Service, Mobile App, Desktop App, Browser Extension, Chat Application, E-commerce, SNS, Game, CMS, Security, Authentication, Authorization, OAuth, JWT, Encryption, HTTPS, SQL Injection, XSS, CSRF, Performance, Caching, Load Balancing, Memory Leak, Browser Rendering, Code Splitting, Lazy Loading, Web Vitals, SEO, Debugging, Error Handling, Logging, Monitoring, Code Review, Documentation, System Design, API Design, UX/UI, Accessibility, Web3, AI/ML, Blockchain, Microservices, Serverless, PWA, WebAssembly, Edge Computing, Cloud Native, IoT\n
                4. 태그 추출: 내용 중에서 관련된 주제나 키워드를 기반으로 적절한 태그를 생성합니다."""
            },
            {
                "role": "user",
                "content": text
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
                        "topic": {"type": "string"},
                        "tags": {
                            "type": "array",
                            "items": {"type": "string"}
                        }
                    },
                    "required": ["title", "summary", "topic", "tags"],
                    "additionalProperties": False
                    }
                }
            }
        )
    data = json.loads(response.choices[0].message.content)
    print(data)
    return data

# API 엔드포인트
@app.post("/analyze-blog/", response_model=BlogResponse)
async def analyze_blog(request: BlogRequest):
    print(request.url)
    try:
        blog_text = extract_blog_content(request.url)
        print(blog_text,'=====blog_text')
        result_data = await analyze_blog_content(blog_text)
        print(result_data,'====result_data')
        return BlogResponse(
            status=200,
            message="success",
            body=result_data
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/feeds", response_model=FeedResponse)
async def get_all_feeds():
    try:
        feeds = await FeedCollection.find().sort([('created_at', -1)]).to_list(100)
        formatted_feeds = []
        for feed in feeds:
            # ObjectId를 문자열로 변환
            feed["_id"] = str(feed["_id"])
            
            # 댓글의 ObjectId도 변환
            if "comment" in feed:
                for comment in feed["comment"]:
                    if "_id" in comment:
                        comment["_id"] = str(comment["_id"])
            
            formatted_feeds.append(feed)
        
        return FeedResponse(
            status=200,
            message="success",
            body=formatted_feeds
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class FeedFilterRequest(BaseModel):
    tag: str
    
class FeedFilterResponse(BaseModel):
    status: int
    message: str
    body: List[FeedwithId]
    
@app.get("/feeds/filtered", response_model=FeedFilterResponse)
async def get_filtered_feeds(request: FeedFilterRequest):
    try:
        feeds = await FeedCollection.find({"tags": request.tag}).sort([('created_at', -1)]).to_list(20)
        formatted_feeds = []
        for feed in feeds:
            feed["_id"] = str(feed["_id"])
            feed["created_at"] = MongoDatetime(date=feed["created_at"])
            feed["updated_at"] = MongoDatetime(date=feed["updated_at"])
            if "comment" in feed:
                for comment in feed["comment"]:
                    comment["created_at"] = MongoDatetime(date=comment["created_at"])
                    comment["_id"] = str(comment["_id"])
            formatted_feeds.append(feed)
        print(formatted_feeds,'=====formatted_feeds')
        return FeedFilterResponse(
            status=200,
            message="success",
            body=formatted_feeds
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class FeedCreateResponse(BaseModel):
    status: int
    message: str
    body: str

@app.post("/feeds", response_model=FeedCreateResponse)
async def create_feed(feed: Feed):
    try:
        current_time = {"$date": datetime.utcnow().isoformat() + "Z"}
        feed_dict = feed.dict(by_alias=True)
        feed_dict["created_at"] = current_time
        feed_dict["updated_at"] = current_time
        
        result = await FeedCollection.insert_one(feed_dict)
        
        return FeedCreateResponse(
            status=200,
            message="success",
            body="success"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/feeds/{feed_id}/comments", response_model=Feed)
async def add_comment(feed_id: str, comment: Comment):
    try:
        current_time = {"$date": datetime.utcnow().isoformat() + "Z"}
        comment_dict = comment.dict(exclude={'id'})
        comment_dict["created_at"] = current_time
        
        await FeedCollection.update_one(
            {"_id": ObjectId(feed_id)},
            {
                "$push": {"comment": comment_dict},
                "$set": {"updated_at": current_time}
            }
        )
        
        updated_feed = await FeedCollection.find_one({"_id": ObjectId(feed_id)})
        if not updated_feed:
            raise HTTPException(status_code=404, detail="Feed not found")
            
        return Feed(**updated_feed)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class FeedPageResponse(BaseModel):
    status: int
    message: str
    body: List[Feed]
    
@app.get("/feeds/{id}", response_model=FeedPageResponse)
async def get_feed(id: str):
    try:
        # MongoDB에서 데이터를 가져옵니다.
        feeds = await FeedCollection.find({"_id": {"$gt": ObjectId(id)}}).sort("created_at", -1).limit(5).to_list(None)

        # 데이터 변환
        formatted_feeds = []
        for feed in feeds:
            # ObjectId를 문자열로 변환
            feed["_id"] = str(feed["_id"])

            # MongoDatetime으로 변환
            feed["created_at"] = MongoDatetime(date=feed["created_at"])
            feed["updated_at"] = MongoDatetime(date=feed["updated_at"])

            # 댓글 처리 (만약 포함된다면)
            if "comment" in feed:
                for comment in feed["comment"]:
                    comment["created_at"] = MongoDatetime(date=comment["created_at"])

            formatted_feeds.append(feed)

        return FeedPageResponse(
            status=200,
            message="success",
            body=formatted_feeds
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class FeedLikeResponse(BaseModel):
    status: int
    message: str
    body: str
    
class FeedLikeRequest(BaseModel):
    userId: str
    
@app.post("/feeds/{feed_id}/like", response_model=FeedLikeResponse)
async def like_feed(feed_id: str, request: FeedLikeRequest):
    try:
        await FeedCollection.update_one({"_id": ObjectId(feed_id)}, {"$addToSet": {"likedUser": request.userId}})
        return FeedLikeResponse(
            status=200,
            message="success",
            body="success"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class FeedCommentResponse(BaseModel):
    status: int
    message: str
    body: str
    
class FeedCommentRequest(BaseModel):
    userId: str
    commentorId: str
    
@app.post("/comments/{feed_id}/like", response_model=FeedCommentResponse)
async def like_comment(feed_id: str, request: FeedCommentRequest):
    try:
        await FeedCollection.update_one({"_id": ObjectId(feed_id), "comment.userId": request.commentorId}, {"$addToSet": {"comment.$.likedUser": request.userId}})
        return FeedCommentResponse(
            status=200,
            message="success",
            body="success"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
class AddCommentResponse(BaseModel):
    status: int
    message: str
    body: str
    
class AddCommentRequest(BaseModel):
    userId: str
    content: str
    
@app.post("/comments/{feed_id}/add", response_model=AddCommentResponse)
async def add_comment(feed_id: str, request: AddCommentRequest):
    try:
        comment = request.dict()
        comment["_id"] = ObjectId()
        comment["likedUser"] = []
        comment["created_at"] = {"$date": datetime.utcnow().isoformat() + "Z"}
        await FeedCollection.update_one({"_id": ObjectId(feed_id)}, {"$addToSet": {"comment": comment}})
        return AddCommentResponse(
            status=200,
            message="success",
            body="success"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)