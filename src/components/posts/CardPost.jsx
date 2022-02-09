import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/post/card-post.css"

const CardPost = ({post}) => {
    console.log(post)
  return (
    <>
      <div
        className="post-nft"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className='header-post-card'>
            <img src={post.userId.image} />
            <div  >
                <Link to={`/profile/${post.userId._id}`} className='header-name'>{post.userId.name}</Link>
                <p className='header-username'>@{post.userId.userName}</p>
            </div>
        </div>
       
        <div className="content-post-card">
            <p>{post.description}</p>
        </div>
      </div>
    </>
  );;
};

export default CardPost;
