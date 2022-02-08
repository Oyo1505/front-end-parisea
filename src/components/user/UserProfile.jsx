import APIHandler from "../../api/APIHandler";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";
import HomeNfts from "../nft/HomeNfts";
import ListNftsUserProfile from "../nft/ListNftsUserProfile";
import useAuth from "./UseAuth";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState("creator");
  if (currentUser.length === 0) return <p>loading</p>;
  return (
    <div>
      <NavLink to={"/posts"}>Posts</NavLink>

      <UserInfo />
      <span onClick={() => setMode("creator")}>Creator</span>
      <span onClick={() => setMode("owner")}>Owner</span>
      <span onClick={() => setMode("posts")}>Posts</span>
      <ListNftsUserProfile mode={mode} userId={currentUser[0]._id} />
    </div>
  );
};

export default UserProfile;
