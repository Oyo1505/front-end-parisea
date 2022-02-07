import React from "react";
import useAuth from "../../user/UseAuth";
import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import { useParams } from "react-router-dom";

const Comment = ({ postId }) => {
  const { id } = useParams();
  const { user } = useAuth();
  console.log(user);
  const [comment, setComment] = useState(postId.comment);

  useEffect(() => {
    (async () => {
      const { data } = await APIHandler.get(`/posts/${postId}/comments`);
      console.log(data);
      setComment(data);
    })();
  }, []);

  const deleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete comment?")) {
      const updatedExistComments = comment.filter(
        (existComment) => existComment.id !== id
      );
      setComment(updatedExistComments);
    }
  };

  if (comment.length === 0) return <p>No comment</p>;

  return (
    <>
      {comment ? (
        <div>
          <div key={comment._id} className="commentedArea">
            <img src={comment.userPfp} alt={comment.userName} />
            <div className="commentDetail">
              <div className="commentDetailDiv">
                <div className="commendUser">{comment.userName}</div>
                <div className="commentDate">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="commentDetailDiv">
                <div className="commentText">{comment.comment}</div>
                <div
                  className="commentDelete"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Comment;
