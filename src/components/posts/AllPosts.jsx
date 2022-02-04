import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Comments from "./comments/Comments";
import "./post.css";
import "./comment.css";

function AllPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [showComment, setShowComment] = useState(true); //FALSE

  // const [mode, setMode] = useState("");

  // const createPost = async () => {
  //   try {
  //     const res = await APIHandler.get("/posts/create");
  //     console.log("api res => ", res);
  //     setPosts(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleView = (mode) => {
  //   setMode(mode);
  //   createPost();
  // };

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

  const updatePost = () => {
    navigate("/posts/" + id);
  };

  const deletePost = async (id) => {
    console.log(id);
    try {
      await APIHandler.post("/posts/delete/" + id);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* {mode === "create" && <Create handler={createPost} />} */}
      <h1>All Posts Page</h1>
      {/* <button onClick={() => handleView(null, "create")}>Create a post</button> */}
      <br></br>
      <hr></hr>
      <br></br>
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
                      <i className="far fa-edit" onClick={updatePost}></i>
                    </div>
                    <div>
                      <i
                        className="far fa-trash-alt"
                        onClick={() => deletePost(id)}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="commentDiv">
                  {showComment && (
                    <Comments
                      commentsUrl="http://localhost:4000/comments"
                      currentUserId="1"
                    />
                  )}
                </div>
                <div className="postedTime">
                  Posted on {post.postedTime.slice(0, 10)}
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
