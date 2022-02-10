import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";
import Post from "./Post";
import "../../assets/css/post/post.css";

function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/mypost/` + id);
      console.log(data);
      setMyPosts(data);
    })();
  }, []);

  return (
    <>
      <div className="profilePostDiv">
        {myPosts.map((post) => {
          const id = String(post._id);
          return (
            <div>
              <Post postId={id} postData={post} key={id} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyPosts;
