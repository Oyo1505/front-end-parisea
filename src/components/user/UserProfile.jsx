import APIHandler from "../../api/APIHandler";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <NavLink to={"/posts"}>Posts</NavLink>

      <UserInfo />
    </div>
  );
};

export default UserProfile;
