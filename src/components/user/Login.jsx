import React, { useEffect, useState } from "react";
import APIHandler from "../../api/APIHandler";
import { Link } from "react-router-dom";
import "../../assets/css/header/header.css";

const Login = () => {
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

        const { data } = await APIHandler.post(`/connect-wallet/${account}`);

        setUser(data);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(e);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      {user.length !== 0 ? (
        <div>

        <Link to={`/profile/${user._id}`}>
          <div className="logo-div">Profile</div>
        </Link>
        <Link className={"button-create"} to={"/nfts/create-item"}>
                Create
          </Link>

          <div className="nav-header">
            <Link to={`/${user._id}`}>
              <div className="profile-btn">
                <img className="profile-btn-img" src={user.image} alt="" />
              </div>
            </Link>
            <Link className={"button-create"} to={"/nfts/create-item"}>
              Create
            </Link>
          </div>

        </div>
      ) : (
        <div>
          <button className={"button-create"} onClick={connectAccounts}>
            Connect Wallet
          </button>
        </div>
      )}

    
    </div>
  );
};

export default Login;
