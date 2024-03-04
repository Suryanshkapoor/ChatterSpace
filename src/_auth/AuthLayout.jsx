import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="bg-main-bg w-full flex items-center justify-center">
          
          <img
            src={logo}
            alt="logo"
            className="hidden p-5 rounded-full lg:block max-w-full max-h-full object-cover bg-no-repeat lg:w-1/2"
          />
          <section className="flex flex-1 flex-col justify-center py-10 ">
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
