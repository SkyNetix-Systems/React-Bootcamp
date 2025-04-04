import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import PhoneAuth from "./components/PhoneAuth"; // ✅ Added Phone Authentication

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/phone-auth" element={<PhoneAuth />} /> {/* ✅ Added phone authentication route */}
            </Routes>
        </Router>
    );
}

export default App;
