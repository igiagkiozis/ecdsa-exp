const keccac256 = require("ethereum-cryptography/keccak").keccak256;
const secp = require("ethereum-cryptography/secp256k1").secp256k1;
const utils = require("ethereum-cryptography/utils");

const privateKeyHex = "b2834250a7b65319b17dad83d91bb34aa00ede6093c7fce470bdf5f8b3e31dd7";
const messageToSign = `{"recipient":"0375254407f4ff82a50be44c14bc109fe116b3628ec31584d8d20d49a21936b1ed","amount":"20"}`;
const privateKey = utils.hexToBytes(privateKeyHex);

console.log("Private key: ", utils.toHex(privateKey));

const messageHash = keccac256(utils.utf8ToBytes(messageToSign));
const signature = secp.sign(messageHash, privateKey);
const serializedSignature = `${signature.toCompactHex()}::${signature.recovery}`
console.log('Message signature: ', serializedSignature);
