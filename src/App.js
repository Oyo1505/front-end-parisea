import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
import { Routes, Route, Link } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import UserEdit from "./components/user/UserEdit";
import React, { useState, useEffect } from "react";
import Login from "./components/user/Login";
import UserProfile from "./components/user/UserProfile";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <a href="/">HOME</a>
        <Login />
        <a href="/posts">POSTS</a>

        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/nfts" element={<ListNfts />} />
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
