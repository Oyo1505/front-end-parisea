import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

const FormNFT = () => {
  const {id} = useParams()
    const [nft, setNft] = useState(null)
    useEffect(async () =>{
      try{
        const {data} = await APIHandler.get(`/nfts/${id}`);
        
        setNft({title: data.title, description: data.description})
      }catch(e){
        console.log(e)
      }
    }, [id])
   const handleSubmit = (e)=>{
      e.preventDefault();
      console.log('d')
      if(id){
        const {data} = APIHandler.patch(`nfts/${id}`, nft)
        console.log(data)
        //setNft(data);
      }
   }
    return (
      <>{id ? (<h1>Update</h1>) : (<h1>Create</h1>)}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" value={nft.title} name="title" onChange={(e)=> setNft({...nft, title : e.target.value})} />
          <label htmlFor="description">Description</label>
          <input id="description" value={nft.description} name="title" onChange={(e)=> setNft({...nft, description : e.target.value})} />
          <button>{id ? ("Update") : ("Create")}</button>
        </form>
      
      </>
    );
};

export default FormNFT;
