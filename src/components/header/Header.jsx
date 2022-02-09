import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoGif from "../../assets/logo/GIF LOGO.gif";
import useAuth from "../user/UseAuth";
import { useParams } from "react-router-dom";
const Header = () => {
  const { currentUser, coverImage } = useAuth();
  const { id } = useParams();

  const inProfileUser = () => {
    if (window.location.href === `http://localhost:3000/${coverImage.id}`)
      return true;
    else return false;
  };
  console.log(inProfileUser());
  return (
    <header
      style={{
        backgroundImage: inProfileUser()
          ? `url(${coverImage.coverImage})  `
          : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: inProfileUser() ? `250px` : "",
      }}
    >
      <nav>
        <div className="nav-header">
          <div className="logo-section">
            <NavLink to={"/"}>
              <div className="logo-section">
                <div className="logo-div">
                  <img className="gif" src={logoGif} alt="logo" />
                </div>
                <p
                  className="pariSea"
                  style={{ color: inProfileUser() ? `white` : "black" }}
                >
                  PariSea
                </p>
              </div>
            </NavLink>
          </div>
          <NavLink to={"/posts"}>Posts</NavLink>
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Header;
