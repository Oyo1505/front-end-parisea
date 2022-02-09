import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";

function FormCreatePost() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const imageRef = useRef("");

  const [posts, setPosts] = useState({
    description: "Behhhhh",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { description } = posts;
    const fd = new FormData();
    fd.append("userId", currentUser[0]._id);
    fd.append("description", description);
    // console.log(imageRef.current.files[0]);
    fd.append("image", imageRef.current.files[0]);

    try {
      console.log("d")
      const res = await APIHandler.post("/posts/create", fd);
      console.log("Post data created >>", res.data);
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Create a new post</h1>
        <form className="postForm">
          <div className="postFormContent">
            <div className="postFormLabel">
              <p>Image</p>
              <p className="postFormLabelText">
                Share us your NTF news!<br></br>PNG & JPG accepted
              </p>
            </div>
            <label for="file">Choose your image file</label>
            <input
              className="postFormInput"
              ref={imageRef}
              name="image"
              type="file"
              id="file"
            />
          </div>
          <div className="postFormContent">
            <div className="postFormLabel">
              <p>Description</p>
              <p className="postFormLabelText">Let's talk about it!</p>
            </div>
            <textarea
              className="postFormInput"
              name="description"
              type="text"
              placeholder="description"
              value={posts.description}
              onChange={(e) =>
                setPosts({ ...posts, description: e.target.value })
              }
            />
          </div>
          <button className="postBtns" onClick={handleSubmit}>
            CREATE
          </button>
        </form>
      </div>
    </>
  );
}

export default FormCreatePost;
