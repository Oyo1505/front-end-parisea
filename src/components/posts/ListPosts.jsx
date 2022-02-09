import React from 'react';
import Trails from '../animations/Trails';
import CardPost from './CardPost';

const ListPosts = ({posts}) => {
  console.log(posts)
    return (
        <>
     <h2>Last NFTs</h2>
          <Trails>
          {posts.map((post) => {
            return <CardPost key={post._id} post={post} />;
          })}
          </Trails>
        </>
      )
};

export default ListPosts;
