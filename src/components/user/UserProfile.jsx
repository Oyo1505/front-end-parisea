import React, { useState } from "react";
import UserInfo from "./UserInfo";
import { NavLink, useParams } from "react-router-dom";
import ListNftsUserProfile from "../nft/ListNftsUserProfile";
import useAuth from "./UseAuth";
import "../../assets/css/user/user-content.css";
import Loading from "../loading/Loading";

const UserProfile = () => {
  const { currentUser, coverImage } = useAuth();
  const { id } = useParams();
  const [mode, setMode] = useState("creator");
  const [isActive, setActive] = useState(false);
  if (currentUser.length === 0) return <Loading />;
  return (
    <div>
      <div className="profile-image-header">
        <div>{/* <img src={currentUser[0].image} /> */}</div>
      </div>

      <div className="body-profile-bis">
        <UserInfo />
        <div className="side-elements-profile">
          <div className="whole-cat-profile">
            <div className="categories-profile">
              <NavLink
                to={"#"}
                activeClassName="is-active"
                onClick={() => setMode("creator")}
              >
                Created
              </NavLink>
              <div onClick={() => setMode("owner")}>Owned</div>
              <div onClick={() => setMode("wishlists")}>Wishlist</div>
              <div onClick={() => setMode("posts")}>Posts</div>
            </div>
          </div>
          <ListNftsUserProfile mode={mode} userId={id} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
