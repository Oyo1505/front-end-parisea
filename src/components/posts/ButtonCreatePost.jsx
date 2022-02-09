import { useNavigate } from "react-router-dom";
import "../../assets/css/post/post.css";

function ButtonCreatePost() {
  const navigate = useNavigate();
  const createPost = () => {
    navigate("/posts/create");
  };
  return (
    <>     
        <button className="postBtns " onClick={createPost}>
          Create a post
        </button>
    </>
  );
}

export default ButtonCreatePost;
