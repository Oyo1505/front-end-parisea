import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Comments from "./comments/Comments";
import "./post.css";
import "./comments/comment.css";

function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [showComment, setShowComment] = useState(true); //FALSE

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await APIHandler.get("/posts");
      console.log(data);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createPost = () => {
    navigate("/posts/create");
  };

  const updatePost = (id) => {
    console.log(id);
    navigate("/posts/" + id);
  };

  const deletePost = async (id) => {
    try {
      await APIHandler.post("/posts/delete/" + id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>All Posts Page</h1>
      <hr></hr>

      <button onClick={createPost}>Create a post</button>

      <div className="container">
        {posts.map((post) => {
          const id = String(post._id);
          const emptyHeart = <i className="far fa-heart"></i>;
          const fullHeart = <i className="fas fa-heart"></i>;

          return (
            <div to={id} key={id}>
              <div className="postDiv">
                <div className="postUser">
                  <img src={post.userPfp} alt={post.userName} />
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
                        onClick={() => updatePost(id)}
                      ></i>
                    </div>
                    <div>
                      <i
                        className="far fa-trash-alt"
                        onClick={() => deletePost(id)}
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
