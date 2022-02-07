import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoGif from "../../assets/logo/GIF LOGO.gif";

const Header = () => {
  return (
    <nav>
      <div className="nav-header">
        <div className="logo-section">
          <NavLink to={"/"}>
            <div className="logo-section">
              <div className="logo-div">
                <img className="gif" src={logoGif} alt="" />
              </div>
              <p className="pariSea">PariSea</p>
              {/* <img className="logo-style" src={logoBlack} alt="Logo" /> */}
            </div>
          </NavLink>
        </div>
        {/* <div>
          <NavLink to={"/"}>Home</NavLink>
        </div> */}
        {/* <NavLink to={"/posts"}>Posts</NavLink> */}
        <div>
          <Login />
        </div>
        <div>
          <div className="div-create-btn">
            <NavLink className={"button-create"} to={"/nfts"}>
              Create
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
