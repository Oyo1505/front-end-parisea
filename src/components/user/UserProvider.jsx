import { useState, useEffect } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

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
        const account = accounts[0];
        const { data } = await APIHandler.get(`/connect-wallet/${account}`);
        setUser(data);
        console.log("Found an authorized account:", account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  const isLogged = { user, checkIfWalletIsConnected };

  return (
    <UserContext.Provider value={isLogged}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
