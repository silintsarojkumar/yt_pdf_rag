
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings

from pdfmcp import reader

from chunking import chunk_fun
from dotenv import load_dotenv

load_dotenv()


# Step 1: Initialize embedding model
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def pdfrag_search(url,query):
    text = reader(url)
    chunks = chunk_fun(text)
    documents = [
    Document(
        page_content=chunk,
        metadata={
            "chunk_id": i,
            "source": url
        }
    )
    for i, chunk in enumerate(chunks)
    ]
    vectorstore = FAISS.from_documents(
    documents=documents,
    embedding=embeddings
    )
    vectorstore.save_local("pdf_faiss_index")
    results = vectorstore.similarity_search(
            query,
            k=3
        )
    return results



