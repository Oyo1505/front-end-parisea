import { useNavigate } from "react-router-dom";
import "../../assets/css/header/header.css";

function ButtonCreatePost() {
  const navigate = useNavigate();
  const createPost = () => {
    navigate("/posts/create");
  };
  return (
    <>
      <button className="logo-div " onClick={createPost}>
        <i class="fa fa-feather"></i>
      </button>
    </>
  );
}

export default ButtonCreatePost;
