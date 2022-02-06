import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Post from "./Post";
import "./post.css";

function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

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

  return (
    <>
      <h1>All Posts Page</h1>
      <hr></hr>

      <button onClick={createPost}>Create a post</button>

      <div className="container">
        {posts.map((post) => {
          const id = post._id;
          return (
            <>
              <div>
                <Link to={id} key={id}>
                  <Post postId={id} />
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
