import React, { useState, useEffect, useRef } from "react";
import APIHandler from "../../api/APIHandler";
import { useNavigate, useParams } from "react-router-dom";

function FormCreatePost({ handler }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef("");
  const [posts, setPosts] = useState({
    image: "",
    description: "Behhhhh",
    style: "",
    isBand: false,
  });

  // UPDATE
  useEffect(async () => {
    const { data } = await APIHandler.get("/posts/" + id);
    setPosts(data);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) {
        const { data } = await APIHandler.post("/posts", posts);
        console.log("Post data created >>", data);
        navigate("/posts");
      } else {
        console.log(posts);
        const { data } = await APIHandler.patch(`/posts/${id}`, posts);
        console.log("Post data updated >> ", data);
        navigate("/posts");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
        <form className="form">
          <div>
            <p>Image</p>
            <input ref={imageRef} name="image" type="file" />
          </div>
          <div>
            <label className="label" htmlFor="description">
              Description
            </label>
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
          <button onClick={handleSubmit}></button>
        </form>
      </div>
    </>
  );
}

export default FormCreatePost;
