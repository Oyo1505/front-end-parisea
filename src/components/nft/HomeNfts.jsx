import { useEffect, useState } from "react";
import useAuth from "../user/UseAuth";
import Loading from "../loading/Loading";
import APIHandler from "../../api/APIHandler";
import CardNFT from "./CardNFT";

const HomeNfts = () => {
  const { currentUser } = useAuth();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await APIHandler.get(`/nfts`);
      console.log(res.data);
      setNfts(res.data).reverse();
    })();
  }, []);

  if (currentUser.length === 0) return <Loading />;

  return (
    <div>
      {nfts.map((nft) => {
        const id = String(nft._id);
        return (
          <div>
            <CardNFT id={id} />
          </div>
        );
      })}
    </div>
  );
};

export default HomeNfts;
