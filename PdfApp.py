from transcriptLoder import loader
from splitter import splitter, splitter2 
from imports import embeddings
from imports import FAISS
from model import llm,llm2
from prompts import prompt
from imports import create_retrieval_chain, create_stuff_documents_chain

from pdf import reader

def pdfreader(url):

    text = reader(url)

    chunks = splitter2(text)

    texts = [doc.page_content for doc in chunks]

    vector_store = FAISS.from_texts(
        texts,
        embeddings
    )  

    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4}
    )

    document_chain = create_stuff_documents_chain(
        llm=llm,
        prompt=prompt
    )

    retrieval_chain = create_retrieval_chain(
        retriever,
        document_chain
    )

    return retrieval_chain


    