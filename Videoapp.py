from sympy import im


from transcriptLoder import loader
from splitter import splitter
from imports import embeddings
from imports import FAISS
from model import llm,llm2
from prompts import prompt

from pdf import reader

def transcript(url,query):

    text = loader(url)


    chunks= splitter(text)

    vector_store = FAISS.from_texts(
        texts=chunks,
        embedding=embeddings
    )

    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    

    docs = retriever.invoke(query)
    context = "\n\n".join(doc.page_content for doc in docs)

    final_prompt = prompt.invoke({"context": context, "question": query})

    answer = llm.invoke(final_prompt)
    return answer.text


