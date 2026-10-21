from re import I

from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

from dotenv import load_dotenv
from langchain_community.document_loaders import YoutubeLoader
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from sympy import im
from model import llm, llm2
from pathlib import Path
import pymupdf
from docx import Document
from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFacePipeline,
    HuggingFaceEmbeddings
)
from prompts import  prompt

import os
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate

from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import (
    create_stuff_documents_chain,
)
from splitter import splitter, splitter2 
from embedding import embeddings
from model import llm, llm2


load_dotenv()