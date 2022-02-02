import React, { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
import "./post.css";
import { useNavigate, useParams } from "react-router-dom";

function AllPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await APIHandler.get("/posts");
      console.log(data);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <h1>All Posts Page</h1>
      <div className="container">
        {posts.map((post) => {
          return (
            <Link to={post._id}>
              <div className="postDiv" key={post._id}>
                <div className="postUser">
                  <img src={post.userPfp} alt={post.userName} />
                  <div className="postUserName">{post.userName}</div>
                </div>

                <div className="postDetail">
                  <div className="postComment">{post.description}</div>

                  <img src={post.image} alt="" />

                  <div className="postIcons">
                    <i class="far fa-heart"> 2 </i>
                    <i class="far fa-comment"> 4 </i>
                    <i class="far fa-edit"></i>
                    <i class="far fa-trash-alt"></i>
                  </div>
                </div>

                <div className="postedTime">{post.postedTime}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
