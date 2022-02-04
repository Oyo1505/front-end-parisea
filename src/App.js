import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./components/posts/AllPosts";
import ListNfts from "./components/nft/ListNfts";
import Header from "./components/header/Header";
import FormNFT from "./components/nft/FormNFT";
import SingleNFT from "./components/nft/SingleNFT";
import UserEdit from "./components/user/UserEdit";
import Login from "./components/user/Login";
import UserProfile from "./components/user/UserProfile";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <Routes>
          <Route path="/:id" element={<UserProfile />} />
          <Route path="/profile/edit/:id" element={<UserEdit />} />
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
