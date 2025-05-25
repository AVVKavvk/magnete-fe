import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import MigrateForm from "./components/Mirgrate";
import useAuthStore from "./store/useStore";

function App() {
  const [accessCode, setAccessCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const { isAdmin, setAdmin } = useAuthStore();

  const allowedCodes = ["AVVKavvk", "AVVK0996", "avvkavvk", "avvk0996"];

  const handleAccessSubmit = (e) => {
    e.preventDefault();
    if (allowedCodes.includes(accessCode.trim())) {
      setAccessGranted(true);
      setAdmin(true);
    } else {
      alert("Incorrect code");
    }
  };

  if (!accessGranted) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <form
          onSubmit={handleAccessSubmit}
          className="card bg-base-100 p-6 shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Enter Access Code
          </h2>
          <input
            type="password"
            className="input input-bordered w-full mb-4"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter code"
          />
          <button type="submit" className="btn btn-primary w-full">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="p-4 h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/migrate" element={<MigrateForm />} />
          <Route path="/edit/:month/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
