import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Comments from "./comments/Comments";
import useAuth from "../user/UseAuth";
import "../../assets/css/post/post.css";
import "../../assets/css/post/comment.css";
import Readmore from "react-read-more-read-less";

const Post = ({ postId, postData, updateState }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(postData);
  const [showComment, setShowComment] = useState(false);
  const [likeAdded, setLikeAdded] = useState(false);
  const emptyHeart = <i className="far fa-heart"></i>;
  const fullHeart = <i className="fas fa-heart"></i>;

  // POST

  const updatePost = (postId) => {
    navigate("/posts/update/" + postId);
  };

  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete comment?")) {
      try {
        // console.log(postId);
        await APIHandler.post("/posts/delete/" + postId);
        updateState((existPost) => existPost.filter((x) => x._id !== postId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // LIKE

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(
        `/posts/likes/${postId}/${currentUser[0]._id}`
      );
      // console.log("likes data", data);
      setLikeAdded(data.likeAdded);
    })();
  }, [postId]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const res = await APIHandler.patch(`/posts/likes/` + postId, {
        userId: currentUser[0]._id,
      });
      // console.log("Like data created >>", res.data);
      setLikeAdded(res.data.likeAdded);
      setPost(res.data.post);
    } catch (err) {
      console.log("OnSubmit err >>> ", err);
    }
  };

  if (post.length === 0 || currentUser.length === 0) return <p>loading</p>;

  return (
    <>
      {post ? (
        <>
          <div className="postDiv">
            <div className="postHeader">
              <Link to={`/${postData.userId._id}`}>
                <div className="postUser">
                  <img src={post.userId.image} alt="img" />
                  <div className="postUserInfo">
                    <div className="postUserName">{post.userId.name}</div>
                    <div className="postUserAccountName">
                      @{post.userId.userName}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="postIcons">
                {currentUser[0]._id === post.userId._id ? (
                  <>
                    <i
                      className="far fa-edit"
                      onClick={() => updatePost(postId)}
                    ></i>

                    <i
                      className="far fa-trash-alt"
                      onClick={() => deletePost(postId)}
                    ></i>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="postBody">
              <img src={post.image} alt="" />
              <div className="postDescription">
                <Readmore
                  charLimit={55}
                  readMoreText={"▼ Read more"}
                  readLessText={"▲ Read less "}
                >
                  {post.description}
                </Readmore>
              </div>
              <div className="postedTime">
                Posted on {post.postedTime.slice(0, 10)}{" "}
                {post.postedTime.slice(11, 19)}
              </div>
            </div>

            <div className="postCommentDiv">
              <div className="postIconsComment">
                <div onClick={handleLike}>
                  {likeAdded ? fullHeart : emptyHeart} {post.likes.length}
                </div>
                <i
                  className="far fa-comment"
                  onClick={() => setShowComment(!showComment)}
                ></i>
                {post.comments.length}
              </div>
              {showComment && <Comments postId={postId} />}
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
