import React from "react";
import "../../assets/css/loading/loading.css";
import loading from "../../assets/logo/loading.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
