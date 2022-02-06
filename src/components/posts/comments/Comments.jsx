import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/${postId}/comments`);
      console.log(data);
      setComments(data);
    })();
  }, [postId]);

  return (
    <>
      <CommentForm onSuccess={() => setComments()} comments={comments} />

      <div>
        {comments.map((comment) => {
          return (
            <div>
              <Comment
                comment={comment}
                commentId={comment.id}
                key={comment.id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
