import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import Post from "./components/posts/Post";
import FormCreatePost from "./components/posts/FormCreatePost";
import FormUpdatePost from "./components/posts/FormUpdatePost";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
import UserEdit from "./components/user/UserEdit";
import UserProfile from "./components/user/UserProfile";
import Marketplace from "./components/marketplace/Marketplace";
import HomeNfts from "./components/nft/HomeNfts";
import PrivateRoute from "./components/protectedRoute/PrivateRoute";
import WishList from "./components/wishList/WishList";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Marketplace />}></Route>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/nfts" element={<HomeNfts />} />
          <Route path="/nfts/:id" element={<SingleNFT />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route element={<PrivateRoute />}> </Route>
          <Route path="/nfts/create-item" element={<FormNFT />} />
          <Route path="/profile/edit/:id" element={<UserEdit />} />
          <Route path="/posts/update/:id" element={<FormUpdatePost />} />
          <Route path="/posts/create" element={<FormCreatePost />} />
          <Route path="/nfts-edit/:id" element={<FormNFT />} />
          <Route path="/wishlist/:id" element={<WishList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
