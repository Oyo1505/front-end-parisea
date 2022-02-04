import React, { useState, useEffect, useRef } from "react";
import APIHandler from "../../api/APIHandler";
import { useNavigate, useParams } from "react-router-dom";

function FormCreatePost() {
  const navigate = useNavigate();
  const imageRef = useRef("");

  const [posts, setPosts] = useState({
    userName: "Mimi",
    userPfp: undefined,
    image: "",
    description: "Behhhhh",
    // postedTime: new Date.now(),
  });

  // UPDATE
  // useEffect(async () => {
  //   const { data } = await APIHandler.get("/posts/" + id);
  //   setPosts(data);
  // }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, userPfp, description } = posts;
    const fd = new FormData();
    fd.append("userName", userName);
    fd.append("userPfp", userPfp);
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

    // axios
    //   .post("http://localhost:4000/posts/create", fd)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/posts");
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
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
