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
 
  // if (currentUser.length === 0) return <p>loading</p>;
  return (
    <div>
      
      <NavLink to={"/wishlist/" + currentUser[0]._id}>WishList</NavLink>

      <div className="profile-image-header">
        <img src={coverImage.image} />
      </div>
    
      <div className="body-profile-bis">
        <UserInfo />
        <div className="side-elements-profile">
          <div className="whole-cat-profile">
            <div className="categories-profile">
              <p onClick={() => setMode("creator")}> Created </p>
              <p onClick={() => setMode("owner")}>Owned</p>
              <p onClick={() => setMode("posts")}>Posts</p>
            </div>
          </div>
          <ListNftsUserProfile mode={mode} userId={coverImage.id} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
