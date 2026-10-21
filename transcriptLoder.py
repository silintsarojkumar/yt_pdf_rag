from imports import YoutubeLoader
from splitter import splitter2,splitter
from imports import embeddings
from imports import FAISS
from model import llm
from prompts import prompt
from imports import (
    create_retrieval_chain,
    create_stuff_documents_chain
)
def loader(url):

    transcript = YoutubeLoader.from_youtube_url(
        url,
        add_video_info=False,
    )

    docs = transcript.load()

    full_text = "\n\n".join(
        doc.page_content for doc in docs
    )

    chunks = splitter(full_text)   # <-- splitter, not splitter2

    vector_store = FAISS.from_texts(
        chunks,
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