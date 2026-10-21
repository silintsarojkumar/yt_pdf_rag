from imports import PyPDFLoader
from imports import splitter2

def reader(url):
    loader = PyPDFLoader(url)
    docs = loader.load()
    docs = splitter2(docs)
    
    return docs


