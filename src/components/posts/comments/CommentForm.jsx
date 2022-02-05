import { useState } from "react";
import APIHandler from "../../../api/APIHandler";

const CommentForm = ({ postId, onSuccess }) => {
  const [comment, setComment] = useState("");
  const disabled = comment.length === 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await APIHandler.patch(`/posts/${postId}/comments`, {
        userId: "61fd561abf55f166cca50c9e",
        comment,
      });
      console.log("Comment data created >>", res.data);
      onSuccess(res.data); // post
      setComment("");
    } catch (err) {
      console.log("OnSubmit err", err);
      console.error(err);
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
