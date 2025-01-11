from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import trafilatura
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
client = OpenAI()

class BlogRequest(BaseModel):
    url: str

class BlogResponse(BaseModel):
    title: str
    summary: str
    url: str
    tags: list[str]

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

def analyze_blog_content(text: str) -> dict:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "블로그 내용에서 제목, 주요 내용, URL, 태그 등을 추출합니다. 제목의 길이는 20자를 절대 넘어서는 안됩니다."
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
                "strict": True,
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

@app.post("/analyze-blog/", response_model=BlogResponse)
def analyze_blog(request: BlogRequest):
    try:
        # URL에서 내용 추출
        blog_text = extract_blog_content(request.url)
        
        # GPT로 분석
        analysis_result = analyze_blog_content(blog_text)
        result_data = json.loads(analysis_result)
        
        return BlogResponse(**result_data)
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))