import APIHandler from "../../api/APIHandler";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  return (
    <div>
      <NavLink to={"/posts"}>Posts</NavLink>

      <UserInfo />
    </div>
  );
};

export default UserProfile;
