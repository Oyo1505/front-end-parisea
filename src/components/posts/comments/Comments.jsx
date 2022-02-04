import { useState, useEffect } from "react";
import APIHandler from "../../../api/APIHandler";
import CommentForm from "./CommentForm";
import OneComment from "./OneComment";

const Comments = ({ commentsUrl, currentUserId }) => {
  const [existComments, setExistComments] = useState([]);
  const [curComment, setCurComment] = useState(); //null

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await APIHandler.get("/comments");
      console.log(data);
      setExistComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const creatComment = async (text) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      userId: "1",
      username: "Mimi",
      createdAt: new Date().toISOString(),
    };
  };

  // const getReplies = (commentId) =>
  //   existComments
  //     .filter((existComment) => existComment. === commentId)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     );

  // const updateCommentApi = async (text) => {
  //   return { text };
  // };

  // const deleteCommentApi = async () => {
  //   return {};
  // };

  const addComment = (text) => {
    creatComment(text).then((comment) => {
      setExistComments([comment, ...existComments]);
      setCurComment(null);
    });
  };

  // const updateComment = (text, commentId) => {
  //   updateCommentApi(text).then(() => {
  //     const updatedexistComments = existComments.map((existComment) => {
  //       if (existComment.id === commentId) {
  //         return { ...existComment, body: text };
  //       }
  //       return existComment;
  //     });
  //     setExistComments(updatedexistComments);
  //     setCurComment(null);
  //   });
  // };
  // const deleteComment = (commentId) => {
  //   if (window.confirm("Are you sure you want to remove comment?")) {
  //     deleteCommentApi().then(() => {
  //       const updatedexistComments = existComments.filter(
  //         (existComment) => existComment.id !== commentId
  //       );
  //       setExistComments(updatedexistComments);
  //     });
  //   }
  // };

  return (
    <div className="comments">
      <CommentForm textSubmit={addComment} />
      <div className="commentsContainer">
        {existComments.map((existComment) => (
          <OneComment
            key={existComment.id}
            addComment={addComment}
            curComment={curComment}
            setCurComment={setCurComment}
            comment={existComment}
            currentUserId={currentUserId}
            // replies={getReplies(existComment.id)}
            // deleteComment={deleteComment}
            // updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
