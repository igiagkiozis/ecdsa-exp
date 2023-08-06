const keccac256 = require("ethereum-cryptography/keccak").keccak256;
const secp = require("ethereum-cryptography/secp256k1").secp256k1;
const utils = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log("Private key: ", utils.toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log("Public key: ", utils.toHex(publicKey));

// const transaction = {
//     amount: 11.5,
//     destination: "0x11929",
// };
// const transaction_str = JSON.stringify(transaction);
//
// const transaction_hash = keccac256(utils.utf8ToBytes(transaction_str));
//
//
// let signature = secp.sign(transaction_hash, privateKey);
// console.log('Create from compact: ', secp.Signature.fromDER(signature.toDERHex()));
// console.log(JSON.stringify(transaction));
// console.log(utils.toHex(transaction_hash));
// console.log('Signature: ', signature.toCompactHex());
// console.log(signature.recoverPublicKey(transaction_hash).toHex());
