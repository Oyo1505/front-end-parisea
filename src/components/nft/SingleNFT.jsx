import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import APIHandler from '../../api/APIHandler';
const SingleNFT = () => {
    const [nft, setNft] = useState({})
    const { id } = useParams();
    console.log(id)
    useEffect( async()=>{
        try{
            const {data} = await APIHandler.get(`/nfts/${id}`)
            console.log(data)
            setNft(data)
        }catch(e){

        }
    },[])
  return (
  <>
    <h1>{nft.title}</h1>
    <img src="#" />
    <p>{nft.description}</p>
    <Link to={`/nfts-edit/${id}`}>Edit NFT</Link>
  </>);
};

export default SingleNFT;
