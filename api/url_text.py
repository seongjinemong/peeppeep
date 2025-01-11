import json
import trafilatura
import os

from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter

#load_dotenv()
#api_key = os.getenv("OPENAI_API_KEY")

def crawl(url):
    downloaded = trafilatura.fetch_url(url)
    contents = trafilatura.extract(
        downloaded, output_format="json",
        include_comments=False, include_links=False, with_metadata=True,
        date_extraction_params={'extensive_search': True, 'original_date': True, 'max_date': None},
    )
    json_output = json.loads(contents)
    return json_output['text']

url_text = crawl('https://velog.io/@simlin/trafilatura-라이브러리')
#url_chunk = split_text_to_chunks(url_text)

detail_mapping = {"하": 1000, "중": 750, "상": 500}
chunk_size = detail_mapping["하"]
        
text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=50,
        separators=["\n\n", "\n", ".", " ", ""]
    )
splits = text_splitter.split_text(url_text)


