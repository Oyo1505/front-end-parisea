import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

function FormUpdatePost() {
  const { id } = useParams();
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
    fd.append("image", imageRef.current.files[0]);

    try {
      const { data } = await APIHandler.patch("/posts/update/" + id, fd);
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  return posts ? (
    <>
      <div className="container">
        <h1>Edit your post</h1>
        <form className="postForm" onSubmit={handleSubmit}>
          <div className="postFormContent">
            <div className="postFormLabel">
              <p>Image</p>
              <p className="postFormLabelText">
                Modify your post image<br></br>PNG & JPG accepted
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
            <input type="file" name="existingImage" hidden />
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
          <button className="postBtns">UPDATE</button>
        </form>
      </div>
    </>
  ) : (
    <p>...loading</p>
  );
}

export default FormUpdatePost;
