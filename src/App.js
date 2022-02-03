import "./App.css";
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
<<<<<<< HEAD
=======
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
>>>>>>> b9891372f319e6e7274c7dd29027c1f5af97d1e4
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/nfts" element={<ListNfts />} />
<<<<<<< HEAD
=======
          <Route path="/nfts/create-item" element={<FormNFT />} />
          <Route path="/nfts/:id" element={<SingleNFT />} />
          <Route path="/nfts-edit/:id" element={<FormNFT />} />
>>>>>>> b9891372f319e6e7274c7dd29027c1f5af97d1e4
        </Routes>
      </div>
    </>
=======
import { Router, Route } from "react-router-dom";
import UserEdit from "./components/user/UserEdit";
import APIHandler from "./api/APIHandler";
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]); // i need a state

  return (
    <div className="App">
      <h1>PariSea</h1>
      <main>Routes</main>
    </div>
>>>>>>> origin/user
  );
}

export default App;
