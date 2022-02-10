import React from "react";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
  return (
    <>
      <div className="postDiv">
        <div className="postHeader">
          <Link to={`/profile/${post.userId._id}`}>
            <div className="postUser">
              <img src={post.userId.image} alt="img" />
              <div className="postUserInfo">
                <div className="postUserName">{post.userId.name}</div>
                <div className="postUserAccountName">
                  @{post.userId.userName}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="postBody">
          <img src={post.image} alt="" />
          <div className="postDescriptionMarketPlace">{post.description}</div>
        </div>
      </div>
    </>
  );
};

export default CardPost;
