import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
//RPC ULR http://localhost:8545 https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
const rpcEndpoint =
  "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const ListNfts = () => {
  const [walletAddress, setWallet] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  };
  const connectAccounts = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(accounts);
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    connectAccounts();
  }, []);
  useEffect(() => {
    loadNFTs();
  }, []);
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return <div></div>;
};

export default ListNfts;
