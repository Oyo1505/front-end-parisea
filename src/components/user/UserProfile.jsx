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
  console.log("ici ++++++", currentUser);

  const [mode, setMode] = useState("creator");
  // if (currentUser.length === 0) return <p>loading</p>;
  return (
    <div className="body-profile">
      {/* <NavLink to={"/posts"}>Posts</NavLink> */}
      <div className="profile-image-header">
        <img src={coverImage.image} />
      </div>
      {/* <NavLink to={"/w"}>WishList</NavLink> */}
      <div className="body-profile-bis">
        <UserInfo />
        <div className="side-elements-profile">
          <div className="whole-cat-profile">
            <div className="categories-profile">
              <p onClick={() => setMode("creator")}>
                Created
                {/* {currentUser[0].nfts_ids_created.length} */}
              </p>
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
