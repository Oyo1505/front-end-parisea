import APIHandler from "../../api/APIHandler";
import React, { useState } from "react";
import UserInfo from "./UserInfo";

const UserProfile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <UserInfo />
    </div>
  );
};

export default UserProfile;
