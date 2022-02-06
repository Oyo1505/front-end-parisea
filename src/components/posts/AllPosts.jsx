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
    (async () => {
      const { data } = await APIHandler.get(`/posts`);
      console.log(data);
      setPosts(data);
    })();
  }, []);

  const createPost = () => {
    navigate("/posts/create");
  };

  console.log(posts);
  return (
    <>
      <h1>All Posts Page</h1>
      <hr></hr>

      <button onClick={createPost}>Create a post</button>

      <div className="container">
        {posts.map((post) => {
          if (posts.length === 0) return <p>all loading...</p>;
          const id = String(post._id);
          return (
            <div>
              <Link to={id}>
                <Post post={post} postId={id} key={id} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
