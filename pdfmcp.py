
from langchain_community.document_loaders import PyPDFLoader

path = r"S:\youtube QA\uploads\Story_2.pdf"

def reader(path):
    loader = PyPDFLoader(path)
    docs = loader.load()
    return " ".join([doc.page_content for doc in docs])



