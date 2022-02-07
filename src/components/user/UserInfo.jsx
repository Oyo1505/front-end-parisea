import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/user/user-info-style.css";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "./UseAuth";

const UserInfo = () => {
  const { id } = useParams();
  const { currentUser, getUser } = useAuth();
  const [isfollowed, setIsFollowed] = useState(false);

  const [user, setUser] = useState({
    name: "",
    image: "",
    userName: "",
    email: "",
    bio: "",
    coverImage: "",
    id_metamask: "",
    follower: [],
    following: [],
    balance: 200,
    twitter: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    // const y = async () => {
    //   if (currentUser.length !== 0) {
    //     try {
    //       const { data } = await APIHandler.get(
    //         `/follower/${id}/` + currentUser[0]._id
    //       );
    //       setIsFollowed(data ? true : false);
    //       console.log("following", isfollowed);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    // };
    const x = async () => {
      const { data } = await APIHandler.get("/users/edit/" + id);
      setUser({
        name: data.name,
        image: data.image,
        userName: data.userName,
        email: data.email,
        bio: data.bio,
        coverImage: data.coverImage,
        id_metamask: data.id_metamask,
        follower: data.follower,
        following: data.following,
        balance: data.balance,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
      });
    };

    // y();
    x();
  }, [id]);

  useEffect(() => {
    console.log("user has changed");
    const y = async () => {
      // if (currentUser.length !== 0) {
      // console.log("following", isfollowed);
      try {
        const { data } = await APIHandler.get(
          `/follower/${id}/` + currentUser[0]._id
        );
        setIsFollowed(data);
      } catch (err) {
        console.error(err);
      }
    };
    // };
    y();
  }, [id, currentUser]);

  const handleFollow = async (e) => {
    try {
      const { data } = await APIHandler.patch(
        `/add-follow/${id}/${currentUser[0]._id}`
      );
      console.log("làààààààààà", data);
      setIsFollowed(!isfollowed);
      const u = await getUser();
      setUser(data.user);
      console.log("--- updated user", u);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="profile-info-section">
        {/* <h4>INFO</h4> */}
        <div className="id-metamask">
          <i class="fas fa-hashtag"></i>
          <strong className="id-name">{user.id_metamask}</strong>
          <i
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(user.id_metamask);
            }}
            className="far fa-clone"
          ></i>
        </div>

        <div className="about-user">
          <div className="name-username">
            <h2 className="h2-profil-info">{user.name}</h2>
            <div>
              <p className="user-namer-color">@{user.userName}</p>
            </div>
          </div>
        </div>
            <img src={user.image} />
            <img src={user.coverImage} />
        <div className="followers-following">
          <div className="following">
            <strong className="following-count">{user.following.length}</strong>
            <p className="following-title">Following</p>
          </div>
          <div className="followers">
            <strong className="followers-count">{user.follower.length}</strong>

            <p className="followers-title">Followers</p>
          </div>

          <div>
            {currentUser &&
            currentUser.length !== 0 &&
            currentUser[0]._id !== id ? (
              <button onClick={(e) => handleFollow(e)} className="edit-profile">
                {!isfollowed ? "Follow" : "Following"}
              </button>
            ) : (
              <Link to={`/profile/edit/${id}`}>
                <button className="edit-profile">Edit Profile</button>
              </Link>
            )}
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
              <a
                className="twitter"
                target="_blank"
                href={`https://facebook.com/${user.facebook}`}
              >
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
                href={`https://instagram.com/${user.instagram}/`}
              >
                <i className="fab fa-instagram"></i>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>

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
