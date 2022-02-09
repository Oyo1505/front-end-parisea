import React from 'react';
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
                <p className='header-name'>{post.userId.name}</p>
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
