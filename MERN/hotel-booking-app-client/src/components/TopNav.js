import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store"; // <-- Make sure logout is exported from store

const TopNav = () => {
    const auth = useSelector((state) => state.auth); // ✅ Correct way
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
                <button onClick={handleLogout} className="nav-link btn btn-link">
                    Logout
                </button>
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
