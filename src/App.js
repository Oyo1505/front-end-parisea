import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import Post from "./components/posts/Post";
import FormCreatePost from "./components/posts/FormCreatePost";
import FormUpdatePost from "./components/posts/FormUpdatePost";
// import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
import UserEdit from "./components/user/UserEdit";
import UserProfile from "./components/user/UserProfile";
import Marketplace from "./components/marketplace/Marketplace";
import HomeNfts from "./components/nft/HomeNfts";

function App() {
  return (
    <>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/create" element={<FormCreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/update/:id" element={<FormUpdatePost />} />
          {/* <Route path="/nfts" element={<ListNfts />} /> */}
          <Route path="/nfts/create-item" element={<FormNFT />} />
          <Route path="/nfts/:id" element={<SingleNFT />} />
          <Route path="/nfts-edit/:id" element={<FormNFT />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
