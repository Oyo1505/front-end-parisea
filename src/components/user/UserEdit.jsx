import React, { useRef, useState, useEffect } from "react";
import "../../App.css";
import APIHandler from "../../api/APIHandler";
// import { useParams } from "react-router-dom";

const UserEdit = ({ id }) => {
  const imageRef = useRef();
  const coverImageRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const { data } = await APIHandler.get("/api/users/" + id);
    setUser(data);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    formData.append("image", coverImageRef.current.files[0]);
    formData.append("name", user.name);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("bio", user.bio);

    try {
      const { data } = await APIHandler.patch(`/api/users/${id}`, formData);
      console.log("Data >>>>>>>>>>> ", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Edit your profile</h1>
      <form action="">
        <div>
          <h2>Enter your details</h2>

          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder=""
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
        </div>

        <div>
          <h2>Receive email notifications</h2>
          <p>This will not be shown on your profile.</p>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <h2>Add a short bio</h2>

          <div>
            <label htmlFor="bio">Enter a short bio</label>
            <input
              type="text"
              name="bio"
              placeholder="Enter a short bio"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </div>
        </div>

        <div>
          <h2>Upload a profile image</h2>
          <p>Recommended size: 1000x1000px. JPG, PNG. 10MB max size.</p>

          <div>
            <input ref={imageRef} name="image" type="file" />
          </div>
        </div>

        <div>
          <h2>Upload a cover image</h2>
          <p>Recommended size: 1500x500px. JPG, PNG, or GIF. 10MB max size.</p>

          <div>
            <input ref={coverImageRef} name="image" type="file" />
          </div>
        </div>

        <button onClick={handleSubmit}>Save changes</button>
      </form>
    </div>
  );
};

export default UserEdit;
