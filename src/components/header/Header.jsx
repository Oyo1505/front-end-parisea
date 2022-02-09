import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoGif from "../../assets/logo/gifLogo.gif";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-header">
          <div className="logo-section">
            <NavLink to={"/"}>
              <div className="logo-section">
                <div className="logo-div">
                  <img className="gif" src={logoGif} alt="logo" />
                </div>
                <p className="pariSea">PariSea</p>
              </div>
            </NavLink>
          </div>
          {/* <NavLink to={"/posts"}>Posts</NavLink> */}
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Header;
