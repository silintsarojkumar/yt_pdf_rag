from sympy import im

from imports import create_retrieval_chain, create_stuff_documents_chain
from imports import llm2
from imports import prompt


document_chain = create_stuff_documents_chain(
    llm=llm2,
    prompt=prompt
)

