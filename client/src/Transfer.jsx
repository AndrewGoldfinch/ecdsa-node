import { useState } from "react";
import { secp256k1 }  from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

import server from "./server";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  let hash;
  async function transfer(evt) {
    evt.preventDefault();
    try {
      console.log("private keyT: " + privateKey);
      if (privateKey) {
        const publicKey = secp256k1.getPublicKey(privateKey);
    
        const message = "amount:" + parseInt(sendAmount);
        const messageBytes = utf8ToBytes(message);
        const messageHash = keccak256(messageBytes); 
    
        console.log("message hash: " + toHex(messageHash));
    
        const signature = secp256k1.sign(messageHash, privateKey);
    
        console.log("message signature: " + signature.toDERHex());
 
        address = signature.toDERHex();
        hash = toHex(messageHash);
      }
    } catch (ex) {
      alert(ex);
    }

    try {    
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        hash: hash,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
