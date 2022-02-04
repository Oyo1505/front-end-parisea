import React, { useRef, useState, useEffect } from "react";
import "../../App.css";
import APIHandler from "../../api/APIHandler";
import { useParams } from "react-router-dom";
import "../../styles/user/user-edit-style.css";

const UserEdit = () => {
  const { id } = useParams();
  const imageRef = useRef("");
  const coverImageRef = useRef("");
  const [user, setUser] = useState({
    name: "",
    image: "",
    userName: "",
    email: "",
    bio: "",
    coverImage: "",
  });

  console.log(id);

  // console.log(user);

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
      });
    };

    x();
  }, [id]);
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append("coverImage", coverImageRef.current.files[0]);
    formData.append("name", user.name);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("bio", user.bio);

    try {
      const { data } = await APIHandler.patch(`/users/edit/${id}`, formData);
      console.log("Data >>>>>>>>>>> ", formData);
      setUser({
        name: data.name,
        userName: data.userName,
        email: data.email,
        bio: data.bio,
        image: data.image,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect();

  return (
    <div className="main">
      <div>
        <h1>Edit your profile</h1>
      </div>
      <div className="form">
        <form>
          <div className="details">
            <div className="title">
              <h2>Enter your details</h2>
            </div>

            <div className="inputs">
              <label htmlFor="name">Name</label>
              <input
                className="input-section"
                type="text"
                name="name"
                placeholder="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />

              <label htmlFor="userName">Username</label>
              <input
                className="input-section"
                type="text"
                name="userName"
                placeholder="userName"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2>
                Receive email <br></br> notifications
              </h2>
              <p>
                Add your email address to <br></br> receive notifications about
                your <br></br> activity on Foundation. This will <br></br> not
                be shown on your profile.
              </p>
            </div>

            <div className="inputs">
              <label htmlFor="email">Email</label>
              <input
                className="input-section"
                type="email"
                name="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2>Add a short bio</h2>
            </div>

            <div className="inputs">
              <label htmlFor="bio">Enter a short bio</label>
              <input
                className="input-section bio"
                type="text"
                name="bio"
                placeholder="Enter a short bio"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2>Upload a profile image</h2>
              <p>
                Recommended size: <br></br> 1000x1000px. <br></br> JPG or PNG.
                <br></br>
                10MB max size.
              </p>
            </div>

            <div className="profile-image">
              <div className="section-padding">
                <div className="image-section">
                  <label htmlFor="files">
                    {imageRef && <img width="350" src={imageRef} />}
                  </label>
                </div>
                <div>
                  <h4 className="image-info">{user.image}</h4>
                </div>
                <input
                  id="files"
                  className="image-input"
                  ref={imageRef}
                  name="image"
                  type="file"
                />
              </div>
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2>Upload a cover image</h2>
              <p>
                Recommended size: <br></br> 1500x500px. <br></br> JPG or PNG.{" "}
                <br></br> 10MB max size.
              </p>
            </div>

            <div className="profile-image">
              <div className="section-padding">
                <div className="image-section">
                  <label htmlFor="files">
                    {coverImageRef && <img width="350" src={coverImageRef} />}
                  </label>
                </div>
                <div>
                  <h4 className="image-info">{user.image}</h4>
                </div>
                <div>
                  <input
                    className="image-input"
                    ref={coverImageRef}
                    name="image"
                    type="file"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <div className="title">
              <h2>
                Add links to your <br></br> social media profiles.
              </h2>
            </div>
            <div className="inputs">
              <label htmlFor="twitter">Twitter Link</label>
              <input
                className="input-section"
                type="text"
                name="twitter"
                placeholder="twitter"
                value={user.twitter}
                onChange={(e) => setUser({ ...user, twitter: e.target.value })}
              />
            </div>

            <div className="inputs">
              <label htmlFor="facebook">Facebook Link</label>
              <input
                className="input-section"
                type="text"
                name="facebook"
                placeholder="facebook"
                value={user.facebook}
                onChange={(e) => setUser({ ...user, facebook: e.target.value })}
              />
            </div>

            <div className="inputs">
              <label htmlFor="instagram">Instagram Link</label>
              <input
                className="input-section"
                type="link"
                name="instagram"
                placeholder="instagram"
                value={user.twitter}
                onChange={(e) =>
                  setUser({ ...user, instagram: e.target.value })
                }
              />
            </div>
          </div>

          <button className="submit" onClick={handleSubmit}>
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
