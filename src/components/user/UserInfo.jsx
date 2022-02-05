import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/user/user-info-style.css";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "./UseAuth";

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    image: "",
    userName: "",
    email: "",
    bio: "",
    coverImage: "",
    id_metamask: "",
    followers: [],
    following: [],
    balance: 200,
    twitter: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    const x = async () => {
      const { data } = await APIHandler.get("/users/edit/" + id);
      console.log(data);
      setUser({
        name: data.name,
        image: data.image,
        userName: data.userName,
        email: data.email,
        bio: data.bio,
        coverImage: data.coverImage,
        id_metamask: data.id_metamask,
        followers: data.followers,
        following: data.following,
        balance: data.balance,
        twitter: data.twitter,
      });
    };

    x();
  }, [id]);

  console.log(id);

  return (
    <div>
      <div className="profile-info-section">
        {/* <h4>INFO</h4> */}
        <div className="id-metamask">
          <p className="id-name">#{user.id_metamask}</p>
        </div>

        <div className="about-user">
          <div className="name-username">
            <h2 className="h2-profil-info">{user.name}</h2>
            <div>
              <p className="user-namer-color">@{user.userName}</p>
            </div>
          </div>
        </div>

        <div className="followers-following">
          <div className="following">
            <strong className="following-count">{user.following.length}</strong>
            <p className="following-title">Following</p>
          </div>
          <div className="followers">
            {/* <strong className="followers-count">{user.followers.length}</strong> */}
            <p className="followers-title">Followers</p>
          </div>

          <div>
            <Link to={`/profile/edit/${id}`}>
              <button className="edit-profile">Edit Profile</button>
            </Link>
          </div>
        </div>

        <div className="social-media-links">
          <div>
            {user &&
            user?.twitter &&
            user?.twitter !== "" &&
            user?.twitter !== "undefined" ? (
              <a
                className="twitter"
                target="_blank"
                href={`https://twitter.com/${user.twitter}`}
              >
                <i className="fab fa-twitter"></i>
              </a>
            ) : (
              <></>
            )}
          </div>
          <div>
            {user &&
            user?.facebook &&
            user?.facebook !== "" &&
            user?.facebook !== "undefined" ? (
              <a className="twitter" href={user.facebook}>
                <i className="fab fa-facebook-f"></i>
              </a>
            ) : (
              <></>
            )}
          </div>
          <div>
            {user &&
            user?.instagram &&
            user?.instagram !== "" &&
            user?.instagram !== "undefined" ? (
              <a
                className="twitter"
                target="_blank"
                href={`https://twitter.com/${user.instagram}`}
              >
                <i className="fab fa-instagram"></i>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
        <a
          target="_blank"
          href="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
        >
          Policies
        </a>
        <div className="biography">
          <strong className="bio-title">Bio</strong>
          {/* <hr style={{ color: "#7F7F7F", width: 350 }} /> */}

          <div>
            <p>{user.bio}</p>
          </div>
        </div>

        <div>
          <div
            style={{ paddingTop: 20, paddingBottom: 20 }}
            className="balance balance-title"
          >
            <span>
              <strong>Balance</strong>
            </span>
            <div>
              <strong>{user.balance} $MHM</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
