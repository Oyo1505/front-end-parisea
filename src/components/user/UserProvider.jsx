import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

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
        const x = await getUser();
        setCurrentUser(x);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        const { data } = await APIHandler.get(`/connect-wallet/${account}`);
        //console.log("data ?:", data[0]);

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const isLogged = { currentUser, getUser, checkIfWalletIsConnected };

  return (
    <UserContext.Provider value={isLogged}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
