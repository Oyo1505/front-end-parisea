import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import useAuth from "../user/UseAuth";
import logoGif from "../../assets/logo/gifLogo.gif";

const Header = () => {
  const { coverImage } = useAuth();

  const inProfileUser = () => {
    if (
      window.location.href ===
      `${process.env.REACT_APP_BACKEND_URL}/profile/${coverImage.id}`
    )
      return true;
    else return false;
  };

  return (
    <header
      style={{
        backgroundImage: inProfileUser()
          ? `url(${coverImage.coverImage})  `
          : "",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
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

          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Header;
