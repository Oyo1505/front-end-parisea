import { useState, useEffect, useRef } from "react";
import APIHandler from "../../api/APIHandler";
import { useNavigate, useParams } from "react-router-dom";

function FormUpdatePost() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const imageRef = useRef();
  const [posts, setPosts] = useState(null);

  // UPDATE
  useEffect(async () => {
    const { data } = await APIHandler.get("/posts/" + id);
    setPosts(data);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("description", posts.description);
    fd.append("title", posts.title);
    console.log(imageRef.current.files[0]);
    fd.append("image", imageRef.current.files[0]);

    try {
      const { data } = await APIHandler.patch("/posts/update/" + id, fd);
      console.log("Post data updated >> ", data);
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return posts ? (
    <>
      <div className="container">
        <h1>Update - post</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <p>Image</p>
            <input ref={imageRef} name="image" type="file" />
            <input type="file" name="existingImage" hidden />
          </div>
          <div>
            <p>title</p>
            <textarea
              className="input"
              name="title"
              type="text"
              placeholder="title"
              value={posts.description}
              onChange={(e) => setPosts({ ...posts, title: e.target.value })}
            />
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
          <button>UPDATE</button>
        </form>
      </div>
    </>
  ) : (
    <p>...loading</p>
  );
}

export default FormUpdatePost;
