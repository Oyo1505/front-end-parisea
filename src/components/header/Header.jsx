import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoBlack from "../../assets/logo/black-logo.png";

const Header = () => {
  return (
    <nav>
      <div className="nav-header">
        <div className="logo-section">
          <div>
            <img className="logo-style" src={logoBlack} alt="Logo" />
          </div>
        </div>
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
