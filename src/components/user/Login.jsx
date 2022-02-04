import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState([]);

  // console.log(user._id);
  async function connectAccounts() {
    try {
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //setAccounts(accounts);
        const { data } = await APIHandler.post(`/connect-wallet/${account[0]}`);
        console.log("THIS >>>>>", data);
        setUser(data[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  //   useEffect(async () => {
  //     try {
  //       connectAccounts();
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }, []);

  console.log("ici", user);

  return (
    <div>
      <button onClick={connectAccounts}>Connect Wallet</button>
      {user.length === 0 ? (
        <Link to={`/${user._id}`}>Profile</Link>
      ) : (
        <button onClick={connectAccounts}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Login;
