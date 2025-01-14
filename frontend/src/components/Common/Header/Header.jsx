import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { PiDotsNine } from "react-icons/pi";
import "../../Pages/Login-Signup/Login";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
// import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const OnClickLogin = () => {
    navigate("/login");
  };

  const OnClickSignup = () => {
    navigate("/signup");
  };

  const handleUser = () => {
    navigate("/user-dashboard");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0 sticky-top navbar_container">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span style={{ color: "black", fontFamily: "Kaushan Script" }}>
              Travel
            </span>
            <span style={{ color: "#0097A7", fontFamily: "Kaushan Script" }}>
              Trance
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i>
              <PiDotsNine />
            </i>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ padding: "1rem" }}
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all-destinations">
                  Destinations
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tour">
                  Exclusive Tour
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {user ? (
              <>
                <h4 className="user__name" onClick={handleUser}>
                  {user.data.username}
                </h4>
                <button className="btn btn-dark logout_btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <button className="login__signup mx-3" onClick={OnClickSignup}>
                  Signup
                </button>
                <button className="login__signup" onClick={OnClickLogin}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* <!-- Navbar --> */}
    </>
  );
};

export default Header;
