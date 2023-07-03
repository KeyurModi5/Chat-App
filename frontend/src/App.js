import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Homepage} element={<Homepage />} />
        <Route path="/chat" Component={Chatpage} element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
