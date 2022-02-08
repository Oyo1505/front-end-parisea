import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [coverImage, setImage] = useState({id:"", coverImage: ""})
  const navigate = useNavigate();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        // const account = accounts[0];
        // const { data } = await APIHandler.get(`/connect-wallet/${account}`);
        // setCurrentUser(data);
        // console.log("Found an authorized account:", account);
        const x = await getUser(accounts[0]);
        setCurrentUser(x);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
 const checkIfAccountIsConnected =   () => {
  const { ethereum } = window;
      ethereum.on('accountsChanged', async (accounts) => {
        try{  
        
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
          
          const x = await getUser(accounts[0]);
          setCurrentUser(x);
          // console.log(currentUser[0]._id, accounts[0] , x)
          // navigate('/')
        }catch(e){
          console.error(ethereum)
        }
      
      });
  }
    const getUser = (account) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const { ethereum } = window;
        // const accounts = await ethereum.request({ method: "eth_accounts" });
        // //const account = accounts[0];
        const { data } = await APIHandler.get(`/connect-wallet/${account}`);
        
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };
  const handleCoverImage = (id, coverImage) =>{
    setImage({id, coverImage})
    console.log(coverImage)
  }
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfAccountIsConnected();
  }, []);

  const isLogged = { currentUser, getUser, checkIfWalletIsConnected,handleCoverImage, coverImage };

  return (
    <UserContext.Provider value={isLogged}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
