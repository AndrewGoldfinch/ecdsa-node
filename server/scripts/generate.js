const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {SignatureType} = require("ethereum-cryptography/secp256k1");

const privateKey = secp256k1.utils.randomPrivateKey();

console.log("private key" + toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey);

console.log("public key" + toHex(publicKey));

const message = "send20";
const messageBytes = utf8ToBytes(message);
//const messageHash = sha256(messageBytes);
const messageHash = keccak256(messageBytes); 

console.log("message hash" + toHex(messageHash));

const signature = secp256k1.sign(messageHash, privateKey);


const isSigned = secp256k1.verify(signature, messageHash, publicKey);

console.log("signature: " + signature.toDERHex());
console.log("recovery " + signature.recovery);


console.log("isSigned " + isSigned);


const sig2 = secp256k1.Signature.fromDER(signature.toDERHex()).addRecoveryBit(0); 


console.log("recoverPublicKey " + signature.recoverPublicKey(messageHash).toHex());
    
console.log("recoverPublicKey(from new) " + sig2.recoverPublicKey(messageHash).toHex());


//const publicKey2 = secp256k1.getPublicKey(toHex(utf8ToBytes('3ace99f6dba1b488ed091e7ec3517051c76a9d41101d978bd39c9cfaca3a3dfb')));
const publicKey2 = secp256k1.getPublicKey("3ace99f6dba1b488ed091e7ec3517051c76a9d41101d978bd39c9cfaca3a3dfb");

const signature3 = secp256k1.sign(messageHash, privateKey);

const signature4 = secp256k1.Signature.fromDER('30450221008602f4126f22a41bb21b36bb042ee97c5b55880f065928aad2b2e1401a066904022055c0b5e72d6e3896d19599a6cf83eb5f7ca8cc9ab6e8df9c2a65e3d5aae5365b').addRecoveryBit(0);
console.log("recoverPublicKey(should fail) " + signature4.recoverPublicKey(messageHash).toHex());
