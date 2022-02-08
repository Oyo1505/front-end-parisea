import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Post from "./Post";
import "../../assets/css/post/post.css";

function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts`);

      setPosts(data);
    })();
  }, []);

  const createPost = () => {
    navigate("/posts/create");
  };

  if (posts.length === 0) return <p>Loading...</p>;

  return (
    <>
      <h1>All Posts Page</h1>
      <hr></hr>

      <button onClick={createPost}>Create a post</button>

      <div className="container">
        {posts.map((post) => {
          const id = String(post._id);
          return (
            <div>
              <Post
                postId={id}
                postData={post}
                key={id}
                updateState={setPosts}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllPosts;
