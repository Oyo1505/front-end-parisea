import { useState } from "react";
import Comments from "./comments/Comments";
import APIHandler from "../../api/APIHandler";
import { useNavigate } from "react-router-dom";
import useAuth from "../user/UseAuth";
import "./post.css";
import "./comments/comment.css";

const Post = (props) => {
  const { user } = useAuth();
  // console.log(user);
  const navigate = useNavigate();
  const [post, setPost] = useState(props.post);
  const [showComment, setShowComment] = useState(true); //FALSE
  const [count, setCount] = useState(0);

  const updatePost = (postId) => {
    // console.log(postId);
    navigate("/posts/update/" + postId);
  };

  const deletePost = async (postId) => {
    try {
      await APIHandler.post("/posts/delete/" + postId);
      navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  };

  const emptyHeart = <i className="far fa-heart"></i>;
  const fullHeart = <i className="fas fa-heart"></i>;

  if (post.length === 0) return <p>one loading...</p>;

  return (
    <>
      {post ? (
        <>
          <div className="postDiv">
            <div className="postUser">
              <img src={post.userId.image} alt={post.userId.name} />
              <div className="postUserName">{post.userId.name}</div>
            </div>
            <div className="postDetail">
              <div className="postComment">{post.description}</div>
              <img src={post.image} alt="" />
              <div className="postIcons">
                <div onClick={() => setCount(count + 1)}>
                  {count === 0 ? emptyHeart : fullHeart}
                  {count}
                </div>
                <div>
                  <i
                    className="far fa-comment"
                    onClick={() => setShowComment(!showComment)}
                  ></i>
                </div>
                <div>
                  <i
                    className="far fa-edit"
                    onClick={() => updatePost(props.postId)}
                  ></i>
                </div>
                <div>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deletePost(props.postId)}
                  ></i>
                </div>
              </div>
            </div>
            <div className="commentDiv">{showComment && <Comments />}</div>
            <div className="postedTime">
              Posted on {post.postedTime.slice(0, 10)}{" "}
              {post.postedTime.slice(11, 19)}
            </div>
          </div>
        </>
      ) : (
        <p>No post</p>
      )}
    </>
  );
};

export default Post;
