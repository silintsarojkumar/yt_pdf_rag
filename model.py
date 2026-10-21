from sympy import im

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

from imports import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-flash-latest"
)

llm2 = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

