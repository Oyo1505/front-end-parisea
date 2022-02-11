import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import useAuth from "../user/UseAuth";

function FormCreatePost() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const imageRef = useRef("");
  const [imgPreviewSrc, setImgPreviewSrc] = useState("");

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
      const res = await APIHandler.post("/posts/create", fd);
      console.log("Post data created >>", res.data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgPreviewSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      <div className="container">
        <h1>Create a new post</h1>
        <form className="postForm">
          <div className="postFormContent">
            <div className="postFormLabel">
              <h2>Image</h2>
              <p className="postFormLabelText">
                Share us your NTF news!<br></br>PNG & JPG accepted
              </p>
            </div>
            <label for="file" className="imgPreview">
              {imgPreviewSrc ? (
                imgPreviewSrc && <img src={imgPreviewSrc} alt="previewImg" />
              ) : (
                <p className="chooseImg">Upload</p>
              )}
            </label>
            <input
              className="postFormnIput"
              ref={imageRef}
              name="image"
              type="file"
              id="file"
              onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
              }}
            />
          </div>

          <div className="postFormContent">
            <div className="postFormLabel">
              <h2>Description</h2>
              <p className="postFormLabelText">Let's talk about it!</p>
            </div>
            <textarea
              className="postFormInput"
              name="description"
              type="text"
              placeholder="description(Max 100 letters)"
              maxlength="75"
              value={posts.description}
              onChange={(e) =>
                setPosts({ ...posts, description: e.target.value })
              }
            />
          </div>
          <button className="postBtns" onClick={handleSubmit}>
            Post Now !
          </button>
        </form>
      </div>
    </>
  );
}

export default FormCreatePost;
