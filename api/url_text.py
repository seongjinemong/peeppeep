import json
import trafilatura
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

url = 'https://velog.io/@simlin/trafilatura-라이브러리'

downloaded = trafilatura.fetch_url(url)
contents = trafilatura.extract(
downloaded, output_format="json",
include_comments=False, include_links=False, with_metadata=True,
date_extraction_params={'extensive_search': True, 'original_date': True, 'max_date': None},
)
json_output = json.loads(contents)
url_text = json_output['text']

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "블로그 내용에서 제목, 주요 내용, URL, 태그 등을 추출합니다. \n\n# Steps\n\n1. **제목 추출**: 블로그 내용에서 명확한 제목을 찾고, 이를 추출합니다.\n2. **주요 내용 식별**: 전체 내용을 분석하여 가장 중요한 부분 또는 요약이 될 수 있는 문장을 식별합니다.\n3. **URL 찾기**: 블로그 내용 중에 포함된 URL을 추출합니다.\n4. **태그 추출**: 내용 중에서 관련된 주제나 키워드를 기반으로 적절한 태그를 생성합니다.\n\n# Output Format\n\n결과는 JSON 형식으로 제공합니다. 다음과 같은 구조를 따릅니다:\n- \"title\": 문자열 - 추출한 제목\n- \"summary\": 문자열 - 주요 내용 또는 요약\n- \"url\": 문자열 또는 빈 문자열 - 추출한 URL\n- \"tags\": 문자열 배열 - 생성한 태그 목록\n"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": url_text
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
          "title": {
            "type": "string",
            "description": "Extracted title from the blog content."
          },
          "summary": {
            "type": "string",
            "description": "Main content or summary identified from the blog."
          },
          "url": {
            "type": "string",
            "description": "Extracted URL from the blog content."
          },
          "tags": {
            "type": "array",
            "description": "List of tags derived from the blog content.",
            "items": {
              "type": "string",
              "description": "A single tag representing a relevant topic or keyword."
            }
          }
        },
        "required": [
          "title",
          "summary",
          "url",
          "tags"
        ],
        "additionalProperties": False
      }
    }
  },
  temperature=1,
  max_completion_tokens=2048,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)



# message의 content만 추출
content_text = response.choices[0].message.content
# content 출력
print(content_text)