const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {SignatureType} = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// matching public keys generated from scripts/generate.js
const balances = {
  "03b19fc114baa5ad8487c58f67f1f0be72f393a539a6662210984cc275084294a8": 100,
  "03c31b8e5b7fa82777b7b6c8343a7e6716870bafcd99750afcd711b1c307f44b2f": 50,
  "02b0180b42fbbebb2f7490b308b21ab1d61809053090fb07bccdeccf3e3d59aea9": 75,
};
        
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hash } = req.body;
  // TODO: get a signature from the client-side application
  // recover the public address from the signature which is the sender
  console.log("sender: " + sender);
  console.log("hash: " + hash);
  
  const signature = secp256k1.Signature.fromDER(sender).addRecoveryBit(0); 
  let senderPublic = signature.recoverPublicKey(hash).toHex();
  console.log("recoverPublicKey (from end-point) " + senderPublic);
  
  // TODO get amount from hash?
  
  setInitialBalance(senderPublic);
  setInitialBalance(recipient);

  if (balances[senderPublic] < amount) {
    console.log("Not enough funds!");
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderPublic] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[senderPublic] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}