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
  "039a954f59ca0d3a3fde3149214e82d6296b4e54b185d898a32760a2465ea39318": 100,
  "0220e4e97938ad34599e95fef72590744df94d84e60ee899e4df021a8b591cb89b": 50,
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
  console.log("recoverPublicKey(from end-point) " + sender);
  
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