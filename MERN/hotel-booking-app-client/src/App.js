import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// components
import PrivateRoute from "./components/PrivateRoute";
import TopNav from "./components/TopNav";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer
        position="top-center"
        autoClose={3000} // optional: close after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/seller" element={<DashboardSeller />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/hotels/new" element={<NewHotel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
