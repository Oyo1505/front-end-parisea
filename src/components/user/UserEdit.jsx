import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import APIHandler from "../../api/APIHandler";
import { useParams } from "react-router-dom";
import useRefs from "react-use-refs";
import "../../assets/css/user/user-edit-style.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../user/UseAuth";
import IconPreview from "./IconPreview";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleCoverImage } = useAuth();
  //const [imageRef, coverImageRef] = useRefs();
  const imageRef = useRef();
  const coverImageRef = useRef();

  const [newImageTmp, setNewImageTmp] = useState("");

  const [user, setUser] = useState({
    name: "",
    image: "",
    userName: "",
    email: "",
    bio: "",
    coverImage: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    const x = async () => {
      const { data } = await APIHandler.get("/users/edit/" + id);
      setUser({
        name: data.name,
        image: data.image,
        userName: data.userName,
        email: data.email,
        bio: data.bio,
        coverImage: data.coverImage,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
      });
    };
    x();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const image = imageRef.current.files[0] || user.image;
    const coverImage = coverImageRef.current.files[0] || user.coverImage;
    formData.append("image", image);
    formData.append("coverImage", coverImage);
    formData.append("name", user.name);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("bio", user.bio);
    formData.append("twitter", user.twitter);
    formData.append("facebook", user.facebook);
    formData.append("instagram", user.instagram);

    try {
      const { data } = await APIHandler.patch(`/users/edit/${id}`, formData);
      setUser({
        name: data.name,
        userName: data.userName,
        email: data.email,
        bio: data.bio,
        image: data.image,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
        coverImage: data.coverImage,
      });
      handleCoverImage(user._id, user.coverImage, user.image);
      navigate(`/profile/${data._id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const [imgSrc, setImgSrc] = useState("");
  const [imgCoverSrc, setImgCoverSrc] = useState("");

  const encodeFileToBase64 = (e) => {
    console.log(e.target);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        if (e.target.name === "profileImage") {
          setImgSrc(reader.result);
        } else if (e.target.name === "coverImage") {
          setImgCoverSrc(reader.result);
        }
        resolve();
      };
    });
  };

  return (
    <div className="main">
      <div>
        <h1 className="h1-edit-profile">Edit your profile</h1>
      </div>
      <div className="form">
        <form className="formulaire-edit-profile" encType="multipart/form-data">
          <div className="details">
            <div className="title">
              <h2 className="h2-edit-profile">Enter your details</h2>
            </div>

            <div className="inputs">
              <label className="label-section-edit-profile" htmlFor="name">
                Name
              </label>
              <input
                className="input-section"
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />

              <label className="label-section-edit-profile" htmlFor="userName">
                Username
              </label>
              <input
                className="input-section"
                type="text"
                name="userName"
                placeholder="UserName"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2 className="h2-edit-profile">
                Receive email <br></br> notifications
              </h2>
              <p className="p-edit-profile">
                Add your email address to <br></br> receive notifications about
                your <br></br> activity on <strong>PariSea</strong>. This will{" "}
                <br></br> not be shown on your profile.
              </p>
            </div>

            <div className="inputs">
              <label className="label-section-edit-profile" htmlFor="email">
                Email
              </label>
              <input
                className="input-section"
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2 className="h2-edit-profile">Add a short bio</h2>
            </div>

            <div className="inputs">
              <label className="label-section-edit-profile" htmlFor="bio">
                Enter a short bio
              </label>
              <textarea
                className="input-section bio"
                type="text"
                name="Bio"
                placeholder="Enter a short bio"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2 className="h2-edit-profile">Upload a profile image</h2>
              <p className="p-edit-profile">
                Recommended size: <br></br> 1000x1000px. <br></br> JPG or PNG.
                <br></br>
                10MB max size.
              </p>
            </div>
            {/* <IconPreview
              image={newImageTmp || user.imageRef}
              clbk={(e) => handleImage(e.target.files[0])}
            /> */}

            <div className="profile-image">
              <div className="section-padding">
                <div className="image-section">
                  <div>
                    <label
                      className="label-section-edit-profile"
                      htmlFor="profileImage"
                    >
                      {imgSrc ? (
                        imgSrc && (
                          <img
                            src={imgSrc}
                            alt="previewImg"
                            // className="imgPreview"
                          />
                        )
                      ) : (
                        <img src={imgSrc} alt="imageRef" />
                      )}
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="image-info">{user.image}</h4>
                </div>
                <input
                  id="profileImage"
                  ref={imageRef}
                  name="profileImage"
                  type="file"
                  hidden
                  onChange={encodeFileToBase64}
                />
              </div>
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2 className="h2-edit-profile">Upload a cover image</h2>
              <p className="p-edit-profile">
                Recommended size: <br></br> 1500x500px. <br></br> JPG or PNG.{" "}
                <br></br> 10MB max size.
              </p>
            </div>

            <div className="profile-image">
              <div className="section-padding">
                <div className="image-section">
                  <label
                    className="label-section-edit-profile"
                    htmlFor="coverImage"
                  >
                    {imgCoverSrc ? (
                      imgCoverSrc && (
                        <img
                          src={imgCoverSrc}
                          alt="previewImg"
                          // className="imgPreview"
                        />
                      )
                    ) : (
                      <img src={imgCoverSrc} alt="" />
                    )}
                  </label>
                </div>
                <div>
                  <h4 className="image-info">{user.coverImage}</h4>
                </div>
                <div>
                  <input
                    id="coverImage"
                    ref={coverImageRef}
                    name="coverImage"
                    type="file"
                    hidden
                    onChange={encodeFileToBase64}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="details-links">
            <div className="title">
              <h2 className="h2-edit-profile">
                Add links to your <br></br> social media profiles.
              </h2>
            </div>

            <div>
              <div className="inputs">
                <label className="label-section-edit-profile" htmlFor="twitter">
                  Twitter
                </label>
                <input
                  className="input-section"
                  type="url"
                  name="twitter"
                  placeholder="Twitter Username"
                  value={user.twitter}
                  onChange={(e) =>
                    setUser({ ...user, twitter: e.target.value })
                  }
                />
              </div>

              <div className="inputs">
                <label
                  className="label-section-edit-profile"
                  htmlFor="facebook"
                >
                  Facebook
                </label>
                <input
                  className="input-section"
                  type="url"
                  name="facebook"
                  placeholder="Facebook Username"
                  value={user.facebook}
                  onChange={(e) =>
                    setUser({ ...user, facebook: e.target.value })
                  }
                />
              </div>

              <div className="inputs">
                <label
                  className="label-section-edit-profile"
                  htmlFor="instagram"
                >
                  Instagram
                </label>
                <input
                  className="input-section"
                  type="url"
                  name="instagram"
                  placeholder="Instagram Username"
                  value={user.instagram}
                  onChange={(e) =>
                    setUser({ ...user, instagram: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <button className="submit" onClick={(e) => handleSubmit(e)}>
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
