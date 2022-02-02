import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <nav>
      <NavLink to={"/posts"}>Posts</NavLink>
      <NavLink to={"/nfts"}>NFTS</NavLink>
    </nav>
  );
};

export default Header;
