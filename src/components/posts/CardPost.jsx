import React from "react";
import { Link } from "react-router-dom";

const CardPost = ({ post }) => {
  return (
    <>
      <div className="postDivMarketPlace">
        <div className="postHeaderMarketPlace">
          <Link to={`/profile/${post.userId._id}`}>
            <div className="postUserMarketPlace">
              <img src={post.userId.image} alt="img" />
              <div className="postUserInfoMarketPlace">
                <div className="postUserNameMarketPlace">
                  {post.userId.name}
                </div>
                <div className="postUserAccountNameMarketPlace">
                  @{post.userId.userName}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="postBodyMarketPlace">
          <img src={post.image} alt="img" />
          <div className="postDescriptionMarketPlace">{post.description}</div>
        </div>
      </div>
    </>
  );
};

export default CardPost;
