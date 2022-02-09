import React from "react";
import "../../assets/css/loading/loading.css";
import loading from "../../assets/logo/gifLogo.gif";
const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-div">
        <img className="gif-loading" src={loading} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
