import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from 'react-router-dom'

const ListNfts = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect( async() => {
    try{
        const { data } = await APIHandler.get('/nfts')
        console.log(data)
      setNfts(data)
    }catch(e){
      console.error(e)
    }
  },[])

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="nfts">
      {nfts.map(el => {
        return ( <Link to={el._id} key={el._id} >{el.title}</Link>)
      })}
    </div>
  );
};

export default ListNfts;
