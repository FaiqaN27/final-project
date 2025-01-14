import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from "../components/Common/Footer/Footer";
import Header from "../components/Common/Header/Header";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";



const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

export default App;
