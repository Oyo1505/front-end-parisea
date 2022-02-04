import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../user/Login";
const Header = () => {
  return (
    <nav>
      <NavLink to={"/"}>HOME</NavLink>
      <NavLink to={"/posts"}>POSTS</NavLink>
      <NavLink to={"/nfts"}>NFTS</NavLink>
      <Login /> 
    </nav>
  );
};

export default Header;
