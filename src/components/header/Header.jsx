import React from "react";
import { NavLink, Link } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoGif from "../../assets/logo/GIF LOGO.gif";
import useAuth from "../user/UseAuth";

const Header = () => {
 const {currentUser} = useAuth()
 console.log(currentUser)
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
          <NavLink to={"/posts"}>Posts</NavLink>
          <div>
          
          </div>
          <div>
          <Login />
       
       
           
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
