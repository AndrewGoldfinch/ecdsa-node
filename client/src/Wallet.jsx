import React, { useState } from "react";
import server from "./server";
import Keys from "./Keys";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey}) {
  
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    getBalance(address);
  }
  
  async function getBalance(address) {
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangePrivateKey(e) {
    const privateKey = e.value;
    setPrivateKey(privateKey);
    const address = e.label;
    console.log("selected public key: " + address);
    setAddress(address);
    getBalance(address);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Select Pre-generated Keys
        <Keys doChange={onChangePrivateKey} defaultValue=""/>
        Wallet Address
        <input placeholder="Or type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;