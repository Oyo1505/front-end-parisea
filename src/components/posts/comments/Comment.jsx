import APIHandler from "../../../api/APIHandler";

const Comment = ({ updateState, postId, commentData }) => {
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
                <div className="commendUser">
                  {commentData.userId.name}{" "}
                  <div className="commendAccountUser">
                    @{commentData.userId.userName.toLowerCase()}
                  </div>
                </div>
                <div className="commentDateDelete">
                  <div>{commentData.commentedTime.slice(0, 10)}</div>
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteComment(postId)}
                  ></i>
                </div>
              </div>
              <div className="commentDetailDiv">
                <div className="commentText">{commentData.comment}</div>
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
