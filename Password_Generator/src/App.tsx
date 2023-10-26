import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./Components/UI/Loader";
import "./app.css";

const Home = lazy(() => import("./pages/Home"));
const SavedPasswords = lazy(() => import("./pages/SavedPasswords"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-passwords" element={<SavedPasswords />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
