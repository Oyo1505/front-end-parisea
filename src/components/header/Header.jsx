import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logo from "../../assets/img/Logo-02.png";

const Header = () => {
  return (
    <nav>
      <div className="logo-section">
        <img className="logo-style" src={logo} alt="Logo" />
      </div>
      <div className="nav-header">
        <div>
          <NavLink to={"/"}>Home</NavLink>
        </div>
        {/* <NavLink to={"/posts"}>Posts</NavLink> */}
        <Login />
        <NavLink className={"button-create"} to={"/nfts"}>
          Create
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
