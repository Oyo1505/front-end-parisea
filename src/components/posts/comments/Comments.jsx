import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/comments/${postId}`);
    
      setComments(data[0].comments);
    })();
  }, [postId]);

  if(comments.length === 0 ) return <p>test</p>

  return (
    <>
      <CommentForm
        postId={postId}
        onSuccess={() => setComments()}

      />

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
