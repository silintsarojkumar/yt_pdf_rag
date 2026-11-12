
from vector import rag_search
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
    You are a helpful AI YouTube chatbot.
    Answer questions based on the retrieved video transcript context.
    Use previous conversation history to understand follow-up questions.
    If the answer is not available in the context,
    clearly say that you don't know.
    """
)

# Separate history for every session
chat_histories = {}


def youtube_rag(url, User, session_id):

    # Get existing history or initialize new history
    if session_id not in chat_histories:
        chat_histories[session_id] = [sys_msg]

    message = chat_histories[session_id]

    # Retrieve relevant context
    context = rag_search(url, User)

    user_msg = HumanMessage(
        content=f"""
        Retrieved Context:
        {context}

        User Question:
        {User}
        """
    )

    message.append(user_msg)

    # Generate response
    response = llm.invoke(message)

    # Store AI response in history
    message.append(response)

    return response.content
