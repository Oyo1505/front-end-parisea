import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/nfts" element={<ListNfts />} />
          <Route path="/nfts/create-item" element={<FormNFT />} />
          <Route path="/nfts/:id" element={<SingleNFT />} />
          <Route path="/nfts-edit/:id" element={<FormNFT />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
