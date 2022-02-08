import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
import "../../assets/css/header/header.css";
import logoGif from "../../assets/logo/GIF LOGO.gif";
import useAuth from "../user/UseAuth";
import { useParams } from "react-router-dom";
const Header = () => {
const { currentUser, coverImage } = useAuth()
const { id } = useParams();
console.log(coverImage)
// useEffect(()=>{
//   const x = async()=> {
//     try{

//     }catch(e){

//     }
//   }
// })
if(currentUser.length === 0)return <p>loadding</p>;
const inProfileUser= ()=> {
  if(window.location.href === `http://localhost:3000/${coverImage.id}`)return true;
  else return false
}

  return (
    <header style={{  backgroundImage  : inProfileUser() ? `url(${coverImage.coverImage})` : ""}}>
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
          <Login />
        </div>
      </nav>
    </header>
  );
};

export default Header;
