import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState([]);
  
  function handleAccountsChanged(accounts) {

    console.log(accounts)
  }
  window.ethereum.on('accountsChanged', handleAccountsChanged);  
  async function connectAccounts() {
    try {
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const { data } = await APIHandler.post(`/connect-wallet/${account[0]}`);
        setUser(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      {user.length !== 0 ? (
        <Link to={`/users/edit/${user._id}`}>Edit profile</Link>
      ) : (
        <button onClick={connectAccounts}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Login;
