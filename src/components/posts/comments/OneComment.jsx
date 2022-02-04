import CommentForm from "./CommentForm";

const OneComment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  // const isReplying =
  //   activeComment &&
  //   activeComment.id === comment.id &&
  //   activeComment.type === "replying";
  // const fiveMinutes = 300000;
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  // const canDelete =
  //   currentUserId === comment.userId && replies.length === 0 && !timePassed;
  // const canReply = Boolean(currentUserId);
  // const canEdit = currentUserId === comment.userId && !timePassed;
  // const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  
  return (
    <>
      <div key={comment.id} className="commentedArea">
        <div className="comment-image-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU"
            style={{ width: "50px", borderRadius: "50%" }}
            alt=""
          />
        </div>
        <div className="comment-right-part">
          <div className="commentContent">
            <div className="comment-author">{comment.username}</div>
            <div>{createdAt}</div>
          </div>
          <div className="displayedComment">
            {!isEditing && <div className="comment-text">{comment.body}</div>}
          </div>
          {/* {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )} */}
          {/* <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div> */}
          {/* {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
            />
          )} */}
          {/* {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  // updateComment={updateComment}
                  // deleteComment={deleteComment}
                  addComment={addComment}
                  parentId={comment.id}
                  // replies={[]}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default OneComment;
 