import { useState, useEffect } from "react";
import Comments from "./comments/Comments";
import APIHandler from "../../api/APIHandler";
import { useNavigate, useParams } from "react-router-dom";
// import useSWR from "swr";
import "./post.css";
import "./comments/comment.css";

const Post = ({ postId }) => {
  const [post, setPost] = useState([]);
  const [showComment, setShowComment] = useState(true); //FALSE
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  // const { data, err } = useSWR(`/posts/${postId}`);
  // console.log(data);
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await APIHandler.get(`/posts/${id}`);
  //     console.log(data);
  //     setPost(data);
  //   })();
  // }, [id]);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data } = await APIHandler.get(`/posts/${postId}`);
      console.log(data);
      setPost(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = (postId) => {
    console.log(postId);
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

  return (
    <>
      <div className="postDiv">
        <div className="postUser">
          <img src="" alt={post.userName} />
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
              <i className="far fa-edit" onClick={() => updatePost(postId)}></i>
            </div>
            <div>
              <i
                className="far fa-trash-alt"
                onClick={() => deletePost(postId)}
              ></i>
            </div>
          </div>
        </div>
        <div className="commentDiv">{showComment && <Comments />}</div>
        <div className="postedTime">
          Posted on {postId.postedTime.slice(0, 10)}{" "}
          {postId.postedTime.slice(11, 19)}
        </div>
      </div>
    </>
  );
};

export default Post;
