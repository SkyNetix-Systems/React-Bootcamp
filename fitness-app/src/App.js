import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Routes>
        <Footer />
      </Box>
    </div>
  );
};

export default App;
