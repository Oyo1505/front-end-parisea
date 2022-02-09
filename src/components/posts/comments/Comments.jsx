import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/comments/` + postId);
      setComments(data.comments);
    })();
  }, [postId]);

  return (
    <>
      <CommentForm postId={postId} setComments={setComments} />
      <div className="commentsList">
        {comments.map((comment) => {
          return (
            <div>
              <Comment
                postId={postId}
                commentData={comment}
                updateState={setComments}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
