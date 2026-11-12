
from vactor2 import pdfrag_search
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import (
    HumanMessage,
    SystemMessage
)

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b"
)

sys_msg = SystemMessage(
    content="""
    You are a helpful AI PDF chatbot.
    Answer questions based on the retrieved PDF context.
    Use previous conversation history to understand follow-up questions.
    If the answer is not available in the PDF context,
    clearly say that you don't know.
    """
)

# Separate conversation history for each session
chat_histories = {}


def pdf_rag(url, User, session_id):

    # Initialize session history
    if session_id not in chat_histories:
        chat_histories[session_id] = [sys_msg]

    message = chat_histories[session_id]

    # Retrieve relevant PDF context
    context = pdfrag_search(url, User)

    # Create human message
    user_msg = HumanMessage(
        content=f"""
        Retrieved Context:
        {context}

        User Question:
        {User}
        """
    )

    message.append(user_msg)

    # Generate AI response
    response = llm.invoke(message)

    # Save AI response in conversation history
    message.append(response)

    return response.content
