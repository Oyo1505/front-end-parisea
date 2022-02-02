import "./App.css";
import { Router, Route } from "react-router-dom";
import UserEdit from "./components/user/UserEdit";
import APIHandler from "./api/APIHandler";
import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]); // i need a state

  return (
    <div className="App">
      <h1>PariSea</h1>
      <main>Routes</main>
    </div>
  );
}

export default App;
