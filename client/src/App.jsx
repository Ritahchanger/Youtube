import { BrowserRouter, Routes,Route } from "react-router-dom";

import Home from "./pages/Home";

import Download from "./components/Download/Download";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home/>} />
          <Route path="/single" element={<Download/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
