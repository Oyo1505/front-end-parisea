import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Post from "./Post";
import "../../assets/css/post/post.css";
import TrailUserProfile from "../animations/TrailUserProfile";
function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/mypost/` + id);
      setMyPosts(data);
    })();
  }, []);

  return (
    <TrailUserProfile>
      {myPosts.map((post) => {
        const id = String(post._id);
        return <Post postId={id} postData={post} key={id} />;
      })}
    </TrailUserProfile>
  );
}

export default MyPosts;
