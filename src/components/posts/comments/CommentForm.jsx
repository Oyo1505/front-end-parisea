import { useState } from "react";

const CommentForm = ({ textSubmit }) => {
  const [text, setText] = useState("");
  const isTextAreaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    textSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="commentForm">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={isTextAreaDisabled}>OK</button>
    </form>
  );
};

export default CommentForm;
