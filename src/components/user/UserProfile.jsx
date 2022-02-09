import APIHandler from "../../api/APIHandler";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";
import HomeNfts from "../nft/HomeNfts";
import ListNftsUserProfile from "../nft/ListNftsUserProfile";
import useAuth from "./UseAuth";
import "../../assets/css/user/user-content.css";

const UserProfile = () => {
  const { currentUser, coverImage } = useAuth();

  const [mode, setMode] = useState("creator");
  console.log(mode)
  // if (currentUser.length === 0) return <p>loading</p>;
  return (
    <div className="body-profile">
      <UserInfo />
      <span onClick={() => setMode("creator")}>Creator</span>
      <span onClick={() => setMode("owner")}>Owner</span>
      <span onClick={() => setMode("posts")}>Posts</span>
      <ListNftsUserProfile mode={mode} userId={coverImage.id} />
    </div>
  );
};

export default UserProfile;
