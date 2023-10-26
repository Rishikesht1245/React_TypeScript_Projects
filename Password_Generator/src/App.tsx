import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SavedPasswords from "./pages/SavedPasswords";
import "./app.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-passwords" element={<SavedPasswords />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
