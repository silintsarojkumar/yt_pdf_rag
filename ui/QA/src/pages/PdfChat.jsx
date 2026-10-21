import { useState } from "react";
import axios from "axios";

function PdfChat() {

  const [pdfUrl, setPdfUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);


  const uploadPdf = async (e) => {

    const file = e.target.files[0];

    if (!file) return;


    const formData = new FormData();
    formData.append("file", file);


    try {

      setUploading(true);


      const res = await axios.post(
        "http://127.0.0.1:5000/pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );


      console.log("Upload Response:", res.data);


      setPdfUrl(
        `http://127.0.0.1:5000${res.data.pdf_url}`
      );


      alert("PDF uploaded successfully");


    } catch (error) {

      console.log(error);
      alert("PDF upload failed");

    }
    finally {

      setUploading(false);

    }

  };



  const askQuestion = async () => {

    if (!question.trim()) return;


    try {

      setLoading(true);


      const res = await axios.post(
        "http://127.0.0.1:5000/chat",
        {
          question: question
        }
      );


      setMessages(prev => [
        ...prev,
        {
          q: question,
          a: res.data.answer
        }
      ]);


      setQuestion("");


    } catch(error) {

      console.log(error);

      setMessages(prev => [
        ...prev,
        {
          q: question,
          a: "Error getting answer"
        }
      ]);

    }
    finally {

      setLoading(false);

    }

  };



  return (

    <div className="h-screen flex overflow-hidden bg-gray-100">


      {/* PDF VIEWER */}

      <div className="w-3/5 border-r bg-white p-4">


        <h1 className="text-2xl font-bold mb-4">
          PDF Viewer
        </h1>


        <input
          type="file"
          accept="application/pdf"
          onChange={uploadPdf}
          className="mb-4 border p-2"
        />


        {
          uploading && (
            <p className="text-blue-500">
              Uploading PDF...
            </p>
          )
        }


        {
          pdfUrl ? (

            <iframe
              src={pdfUrl}
              title="PDF Preview"
              className="w-full h-[85vh] border"
            />

          )
          :
          (
            <div className="h-[85vh] flex items-center justify-center border">

              <p className="text-gray-500">
                Upload PDF to preview
              </p>

            </div>
          )
        }


      </div>





      {/* CHAT SECTION */}

      <div className="w-2/5 flex flex-col bg-white">


        <h1 className="text-2xl font-bold p-4 border-b">
          PDF Chat
        </h1>



        <div className="flex-1 overflow-y-auto p-4">


          {
            messages.map((m,i)=>(

              <div
                key={i}
                className="mb-4"
              >

                <div className="bg-blue-100 p-3 rounded">

                  <b>You:</b>

                  <p>
                    {m.q}
                  </p>

                </div>



                <div className="bg-gray-100 p-3 rounded mt-2">

                  <b>Bot:</b>

                  <p>
                    {m.a}
                  </p>

                </div>


              </div>

            ))
          }


          {
            loading && (
              <p className="text-gray-500">
                Thinking...
              </p>
            )
          }


        </div>





        <div className="p-4 border-t flex gap-2">


          <input

            value={question}

            onChange={(e)=>
              setQuestion(e.target.value)
            }

            placeholder="Ask question from PDF..."

            className="border p-3 flex-1 rounded"

          />



          <button

            onClick={askQuestion}

            className="bg-blue-600 text-white px-5 rounded"

          >

            Send

          </button>


        </div>



      </div>



    </div>

  );

}


export default PdfChat;