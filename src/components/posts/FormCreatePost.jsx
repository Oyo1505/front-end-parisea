import { useState, useRef } from "react";
import APIHandler from "../../api/APIHandler";
import { useNavigate } from "react-router-dom";
import useAuth from "../user/UseAuth";

function FormCreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const imageRef = useRef("");

  const [posts, setPosts] = useState({
    // userId: "",
    // userName: "Mimi",
    // userPfp: "",
    image: "",
    description: "Behhhhh",
    // postedTime: new Date.now(),
  });

  // console.log(user[0]._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { description } = posts;
    const fd = new FormData();
    fd.append("userId", user[0]._id);
    fd.append("description", description);
    console.log(imageRef.current.files[0]);
    fd.append("image", imageRef.current.files[0]);

    try {
      console.log(fd);
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
        <h1>Create - post</h1>
        <form className="form">
          <div>
            <p>Image</p>
            <input ref={imageRef} name="image" type="file" />
          </div>
          <div>
            <p>Description</p>
            <textarea
              className="input"
              name="description"
              type="text"
              placeholder="description"
              value={posts.description}
              onChange={(e) =>
                setPosts({ ...posts, description: e.target.value })
              }
            />
          </div>
          <button onClick={handleSubmit}>CREATE</button>
        </form>
      </div>
    </>
  );
}

export default FormCreatePost;
