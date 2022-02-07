import { useState, useEffect } from "react";
import Comments from "./comments/Comments";
import APIHandler from "../../api/APIHandler";
import { useNavigate } from "react-router-dom";
import "./post.css";
import "./comments/comment.css";
import useAuth from "../user/UseAuth";

const Post = ({ postId }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [showComment, setShowComment] = useState(true); //FALSE
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      console.log(postId);
      try {
        const { data } = await APIHandler.get(`/posts/` + postId);
        setPost(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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

  const emptyHeart = <i className="far fa-heart"></i>;
  const fullHeart = <i className="fas fa-heart"></i>;

  if (post.length === 0) return <p>loqd</p>;
  return (
    <>
      {post ? (
        <>
          {/* <div className="postDiv">
            <div className="postUser">
              <img src={post.userId.image} alt={post.userId.image} />
              <div className="postUserName">{post.userName}</div> 
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
          </div> */}
        </>
      ) : (
        <p>No post</p>
      )}
    </>
  );
};

export default Post;
