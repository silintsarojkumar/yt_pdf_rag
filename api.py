
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from uuid import uuid4
from pathlib import Path

from main import youtube_rag
from main2 import pdf_rag

import shutil


app = FastAPI()

# Next.js frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)

# Store active sessions
sessions = {}


# Request models
class YoutubeRequest(BaseModel):
    url: HttpUrl


class ChatRequest(BaseModel):
    session_id: str
    question: str


# Home endpoint
@app.get("/")
def home():
    return {
        "message": "YouTube and PDF RAG API is running"
    }


# --------------------------------
# YouTube Processing
# --------------------------------

@app.post("/youtube")
def youtube(req: YoutubeRequest):

    try:
        session_id = str(uuid4())

        url = str(req.url)

        sessions[session_id] = {
            "type": "youtube",
            "url": url
        }

        return {
            "success": True,
            "message": "YouTube URL registered successfully",
            "session_id": session_id
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------
# PDF Upload
# --------------------------------

@app.post("/pdf")
def upload_pdf(file: UploadFile = File(...)):

    try:

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed"
            )

        session_id = str(uuid4())

        filename = f"{session_id}.pdf"
        filepath = UPLOAD_FOLDER / filename

        with filepath.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        sessions[session_id] = {
            "type": "pdf",
            "filepath": str(filepath)
        }

        return {
            "success": True,
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "session_id": session_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        file.file.close()


# --------------------------------
# Chat Endpoint
# --------------------------------

@app.post("/chat")
def chat(req: ChatRequest):

    session = sessions.get(req.session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found. Please load a PDF or YouTube video."
        )

    if not req.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )

    try:

        # YouTube RAG
        if session["type"] == "youtube":

            result = youtube_rag(
                session["url"],
                req.question,
                req.session_id
            )

        # PDF RAG
        elif session["type"] == "pdf":

            result = pdf_rag(
                session["filepath"],
                req.question,
                req.session_id
            )

        else:
            raise HTTPException(
                status_code=400,
                detail="Invalid session type"
            )

        return {
            "success": True,
            "session_id": req.session_id,
            "answer": result
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------
# Run Application
# --------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
