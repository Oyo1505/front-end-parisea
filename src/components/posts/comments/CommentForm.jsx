import { useState } from "react";
import APIHandler from "../../../api/APIHandler";

const CommentForm = ({ id, textSubmit }) => {
  const [texts, setTexts] = useState({
    commentUserID: id,
    // userName: "",
    // userPfp: "",
    // commentText: "",
  });
  const isTextAreaDisabled = texts.length === 0;
  console.log(id);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await APIHandler.patch("/comments", texts);
      console.log(texts, res.data);
      //console.log("Comment data created >>", res.data);
      textSubmit(texts);
      setTexts("");
    } catch (err) {
      console.log("err");
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="commentForm">
      <div>
        <input
          type="text"
          // value={texts.text}
          onChange={(e) => setTexts({ ...texts, text: e.target.value })}
        />
      </div>
      <div>
        <button disabled={isTextAreaDisabled}>OK</button>
      </div>
    </form>
  );
};

export default CommentForm;
