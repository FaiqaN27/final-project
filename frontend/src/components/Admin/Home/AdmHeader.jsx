import React from "react";
import { RiAlignJustify } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdmHeader = ({ OpenSidebar }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="header">
      <div className="menu-icon">
        <RiAlignJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <h2>Travel & Trance</h2>
      </div>
      <div className="header-right">
        <button className="btn btn-light" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdmHeader;
