import React, { useContext, useState } from "react";
import { MdPerson2 } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./loginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  // Function to validate the password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    // Clear the password error when the user starts typing
    if (e.target.id === "password") {
      setPasswordError("");
    }

    if (e.target.id === "password" || e.target.id === "confirmPassword") {
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before making the API call
    if (!validatePassword(credentials.password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain one uppercase letter, and one special character."
      );
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/v1/auth/register`, credentials);
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message || "Registration failed, please try again."
      );
    }
  };

  return (
    <div className=" container-fluid background-body">
      <div className="row justify-content-center ">
        <div className="col-8 col-sm-12 signup-container">
          <div className="signup-header">
            <div className="signup-heading">Signup</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label
                htmlFor="username"
                className="col-sm-2 col-form-label icon-span"
              >
                <span>
                  <MdPerson2 />
                </span>
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control signup-input"
                  id="username"
                  placeholder="Name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="email"
                className="col-sm-2 col-form-label icon-span"
              >
                <span>
                  <MdEmail />
                </span>
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control signup-input"
                  id="email"
                  placeholder="Email Id"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="password"
                className="col-sm-2 col-form-label icon-span"
              >
                {" "}
                <span>
                  <RiLockPasswordFill />
                </span>
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control signup-input"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="confirmPassword"
                className="col-sm-2 col-form-label icon-span"
              >
                <span>
                  <RiLockPasswordFill />
                </span>
              </label>
              <div className="col-sm-8 password-field">
                <input
                  type="password"
                  className="form-control signup-input"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            {passwordError && (
              <p className="text-danger text-center">{passwordError}</p>
            )}
            {confirmPasswordError && (
              <p className="text-danger text-center">{confirmPasswordError}</p>
            )}

            <p className="text-center">
              Already have an account? <Link to="/login">Login</Link>{" "}
            </p>

            <div className="form-group row justify-content-center">
              <button type="submit" className="btn LoginSignup__btn">
                Create Account
              </button>
            </div>
          </form>

          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
