import { useState, useEffect } from "react";
import Comments from "./comments/Comments";
import APIHandler from "../../api/APIHandler";
import { useNavigate } from "react-router-dom";
import "./post.css";
import "./comments/comment.css";

const Post = ({ postId, postData, comments }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(postData);
  const [showComment, setShowComment] = useState(false); //FALSE
  const [count, setCount] = useState(0);
  const [likeAdded, setLikeAdded] = useState(false);

  const toggle = () => {
    setLikeAdded(!likeAdded);
  };

  const updatePost = (postId) => {
    navigate("/posts/update/" + postId);
  };

  const deletePost = async (postId) => {
    try {
      await APIHandler.post("/posts/delete/" + postId);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(postData);

  const emptyHeart = <i className="far fa-heart"></i>;
  const fullHeart = <i className="fas fa-heart"></i>;

  // if (post.length === 0 && !post.userId) return <p>loading</p>;

  return (
    <>
      {post ? (
        <>
          <div className="postDiv">
            <div className="postUser">
              <img src={post.userId.image} alt="img" />
              <div className="postUserName">{post.userId.name}</div>
            </div>
            <h4>{post.title}</h4>
            <div className="postDetail">
              <div className="postComment">{post.description}</div>
              <img src={post.image} alt="" />
              <div className="postIcons">
                <div onClick={() => toggle()}>
                  {likeAdded === true ? fullHeart : emptyHeart}
                </div>
                <div>
                  <i
                    className="far fa-comment"
                    onClick={() => setShowComment(!showComment)}
                  ></i>{" "}
                  {post.comments.length}
                </div>
                <div>
                  <i
                    className="far fa-edit"
                    onClick={() => updatePost(post.postId)}
                  ></i>
                </div>
                <div>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deletePost(post.postId)}
                  ></i>
                </div>
              </div>
            </div>
            <div className="commentDiv">
              {showComment && <Comments postId={postId} />}
            </div>
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
