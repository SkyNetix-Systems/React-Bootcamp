import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store"; // Make sure logout is exported

const TopNav = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <div className="nav bg-light d-flex justify-content-between">
            <Link className="nav-link" to="/">Home</Link>

            {auth?.token ? (
                <>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link> {/* 👈 Added */}
                    <button onClick={handleLogout} className="nav-link btn btn-link">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </>
            )}
        </div>
    );
};

export default TopNav;
