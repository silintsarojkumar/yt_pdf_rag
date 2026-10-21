import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PdfChat from "./pages/PdfChat";
import YtChat from "./pages/YtChat";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route 
          path="/pdf" 
          element={<PdfChat />} 
        />

        <Route 
          path="/video" 
          element={<YtChat />} 
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;