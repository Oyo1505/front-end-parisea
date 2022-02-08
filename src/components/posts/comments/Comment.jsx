import APIHandler from "../../../api/APIHandler";

const Comment = ({ updateState, postId, commentData }) => {
  const editComment = async (id) => {
    try {
      await APIHandler.patch("/posts/comments/edit/" + id, {
        commentId: commentData._id,
      });
      updateState((existComments) =>
        existComments.filter((x) => x._id !== commentData._id)
      );
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete comment?")) {
      try {
        await APIHandler.patch("/posts/comments/delete/" + id, {
          commentId: commentData._id,
        });
        updateState((existComments) =>
          existComments.filter((x) => x._id !== commentData._id)
        );
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };

  if (commentData.length === 0) return <p>No comment</p>;

  return (
    <>
      {commentData ? (
        <div>
          <div key={commentData._id} className="commentedArea">
            <img src={commentData.userId.image} alt="img" />
            <div className="commentDetail">
              <div className="commentDetailDiv">
                <div className="commendUser">{commentData.userId.name}</div>
                <div className="commentDate">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="commentDetailDiv">
                <div className="commentText">{commentData.comment}</div>
                <div className="commentDelete">
                  {/* <div onClick={() => editComment(postId)}>Edit</div> */}
                  <div onClick={() => deleteComment(postId)}>Delete</div>
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
