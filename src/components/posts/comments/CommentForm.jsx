import { useState } from "react";
import APIHandler from "../../../api/APIHandler";
import useAuth from "../../user/UseAuth";

const CommentForm = ({ postId, setComments }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const disabled = comment.length === 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await APIHandler.patch(`/posts/comments/${postId}`, {
        userId: user[0]._id,
        comment,
      });
      console.log("Comment data created >>", res.data);
      setComments((existComments) => [
        res.data.comments[res.data.comments.length - 1],
        ...existComments,
      ]);
      setComment("");
    } catch (err) {
      console.log("OnSubmit err >>> ", err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="commentForm">
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <button disabled={disabled}>OK</button>
      </div>
    </form>
  );
};

export default CommentForm;
