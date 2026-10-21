from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PdfApp import pdfreader
from transcriptLoder import loader
from flask import send_from_directory
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

retrieval = None
Tloader = None
url = " "


@app.route("/")
def home():
    return "API Running"

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )


@app.route("/pdf", methods=["POST"])
def upload_pdf():
    global retrieval

    if "file" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "error": "No file selected"
        }), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    file.save(filepath)

    retrieval = pdfreader(filepath)

    return jsonify({
        "message": "PDF uploaded successfully",
        "filename": filename,
        "pdf_url": f"/uploads/{filename}"
    })

@app.route("/chat", methods=["POST"])
def QA():
    global retrieval

    if retrieval is None:
        return jsonify({
            "error": "Please upload a PDF or load a video first"
        }), 400

    data = request.get_json()

    question = data.get("question")

    result = retrieval.invoke({
        "input": question
    })

    return jsonify({
        "answer": result["answer"]
    })


@app.route("/video", methods=["POST"])
def video():
    global retrieval

    try:
        data = request.get_json()

        print("DATA:", data)

        if not data:
            return jsonify({"error": "No JSON received"}), 400

        url = data.get("url")

        print("URL:", url)

        retrieval = loader(url)

        print("RETRIEVAL CREATED:", retrieval)

        return jsonify({
            "message": "Transcript loaded successfully"
        })

    except Exception as e:
        print("VIDEO ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500  


if __name__ == "__main__":
    app.run(debug=True)