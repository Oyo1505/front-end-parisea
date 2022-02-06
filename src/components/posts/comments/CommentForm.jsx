import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import useAuth from "../../user/UseAuth";
import { useParams } from "react-router-dom";

const CommentForm = ({ postId, onSuccess }) => {
  const { id } = useParams();
  // console.log(postId);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const disabled = comment.length === 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await APIHandler.patch(`/posts/` + id, {
        userId: user[0]._id,
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
