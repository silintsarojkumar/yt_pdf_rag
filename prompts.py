
from imports import PromptTemplate
from langchain_core.prompts import ChatPromptTemplate
prompt = PromptTemplate(
    template="""
    You are a helpful assistant.
    Answer ONLY from the provided transcript context.
    dont say Based on the provided context, in result
    If the context is insufficient, just say you don't know.

    Context:
    {context}

    Question:
    {input}
    """,
    input_variables=["context", "input"]
)

