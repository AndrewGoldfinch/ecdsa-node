const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();

console.log("private key" + toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);

console.log("public key" + toHex(publicKey));

const message = "send20";
const messageBytes = utf8ToBytes(message);
const messageHash = sha256(messageBytes);

console.log("message hash" + toHex(messageHash));

const signature = secp256k1.sign(messageHash, privateKey);


const isSigned = secp256k1.verify(signature, messageHash, publicKey);

console.log("signature" + signature.toDERHex());

console.log("isSigned " + isSigned);
