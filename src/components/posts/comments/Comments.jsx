import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import CommentForm from "./CommentForm";

const Comments = ({ id, text }) => {
  const [existComments, setExistComments] = useState([]);
  // console.log(existComments);

  const creatComment = (text) => {
    return {
      id: Math.random().toString(36),
      userId: "",
      username: "Mimi",
      body: text,
      createdAt: new Date().toISOString(),
    };
  };

  const addComment = (text) => {
    console.log("text", text);
    const newComm = creatComment(text);

    setExistComments([newComm, ...existComments]);
  };

  const deleteComment = (id) => {
    if (window.confirm("Are you sure you want to delete comment?")) {
      const updatedExistComments = existComments.filter(
        (existComment) => existComment.id !== id
      );
      setExistComments(updatedExistComments);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await APIHandler.get("/api/comments");
      console.log(data);
      setExistComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <CommentForm textSubmit={addComment} id={id} />
      {existComments.map((existComment, index) => {
        return (
          <div key={index} className="commentedArea">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU"
              alt=""
            />
            <div className="commentDetail">
              <div className="commentDetailDiv">
                <div className="commendUser">{existComment.username}</div>
                <div className="commentDate">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="commentDetailDiv">
                <div className="commentText">{existComment.body}</div>
                <div
                  className="commentDelete"
                  onClick={() => deleteComment(existComment.id)}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
