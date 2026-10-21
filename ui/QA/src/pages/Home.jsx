import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="flex gap-10">

        <Link to="/pdf">
          <div className="bg-white w-80 p-8 rounded-xl shadow-lg hover:scale-105 cursor-pointer">

            <h2 className="text-3xl font-bold">
              📄 Chat with PDF
            </h2>

            <p className="mt-3 text-gray-600">
              Upload PDF and ask questions
            </p>

          </div>
        </Link>


        <Link to="/video">
          <div className="bg-white w-80 p-8 rounded-xl shadow-lg hover:scale-105 cursor-pointer">

            <h2 className="text-3xl font-bold">
              🎥 Chat with YouTube
            </h2>

            <p className="mt-3 text-gray-600">
              Chat with video transcript
            </p>

          </div>
        </Link>

      </div>

    </div>
  );
}

export default Home;