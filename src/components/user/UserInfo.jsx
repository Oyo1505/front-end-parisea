import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/user/user-info-style.css";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

const UserInfo = () => {
  const { id } = useParams();
  const imageRef = useRef("");
  const coverImageRef = useRef("");
  const [user, setUser] = useState({
    name: "Name",
    image: "",
    userName: "@Something",
    email: "",
    bio: "",
    coverImage: "",
    id_metamask: "0xd7a0164b3ab7325Fc1eF1051fC400543751b3a2A",
    followers: [],
    following: [],
    balance: 200,
    twitter: "https://twitter.com/rivoire_julien",
    facebook: "https://www.facebook.com/zuck",
    instagram: "https://www.instagram.com/obvious_art/",
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
      });
    };

    x();
  }, [id]);

  console.log(id);

  return (
    <div>
      <div className="profile-info-section">
        <h4>INFO</h4>
        <div className="id-metamask">
          <p className="id-name">#{user.id_metamask}</p>
        </div>

        <div className="about-user">
          <div className="name-username">
            <h2 className="h2-profil-info">{user.name}</h2>
            <div>
              <p className="user-namer-color">{user.userName}</p>
            </div>
          </div>
        </div>

        <div className="followers-following">
          <div className="following">
            <strong className="following-count">{user.following.length}</strong>
            <p className="following-title">Following</p>
          </div>
          <div className="followers">
            <strong className="followers-count">{user.followers.length}</strong>
            <p className="followers-title">Followers</p>
          </div>

          <div>
            <Link to={`/profile/edit/${user.id}`}>
              <button className="edit-profile">Edit Profile</button>
            </Link>
          </div>
        </div>

        <div>
          <hr style={{ color: "#7F7F7F", width: 350 }} />
          <div
            style={{ paddingTop: 20, paddingBottom: 20 }}
            className="balance"
          >
            <span>
              <strong>Balance</strong>
            </span>
            <div>
              <strong>{user.balance} $MHM</strong>
            </div>
          </div>
          <hr style={{ color: "#7F7F7F", width: 350 }} />
        </div>

        <div className="social-media-links">
          <div>
            <a className="twitter" href={user.twitter}>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div>
            <a className="twitter" href={user.facebook}>
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
          <div>
            <a className="twitter" href={user.instagram}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
