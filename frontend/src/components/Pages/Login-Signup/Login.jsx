import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./loginSignup.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
// import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${BASE_URL}/v1/auth/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // localStorage.setItem('token', data.token)
      // console.log(res.data.token);
      // const decoded = jwtDecode(data.token);

      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // Check if the user is an admin
      if (
        res.data.role === "admin" ||
        res.data.email === "traveltrans6725@gmail.com"
      ) {
        alert("Welcome to the Dashboard!");
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed, please try again.");
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <div className=" container-fluid background-body">
      <div className="row justify-content-center ">
        <div className="col-8 col-sm-12 signup-container">
          <div className="signup-header">
            <div className="signup-heading">Login</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit}>
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
                  required
                  id="email"
                  placeholder="Email Id"
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
                  required
                  className="form-control signup-input"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="form-group row justify-content-center">
              <button type="submit" className="btn LoginSignup__btn">
                Login
              </button>
            </div>
          </form>

          <p className="text-center">
            Don't have an account? <Link to="/signup">Create</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
