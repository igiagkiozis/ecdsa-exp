const secp = require("ethereum-cryptography/secp256k1").secp256k1;
const keccac256 = require("ethereum-cryptography/keccak").keccak256;
const express = require("express");
const app = express();
const cors = require("cors");
const utils = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

// The private keys below are presumably secret. They are included here only for convenience.
// 1
// Private key:  b2834250a7b65319b17dad83d91bb34aa00ede6093c7fce470bdf5f8b3e31dd7
// Public key:  02c45ddf1f7abe1f42e7b079e6f5e0de75f462ffb61ad3eca2a00c054f2ffcee6e
// 2
// Private key:  084489f724ad7fe174d63c498c021778f68730b825b73e0c1fa668d8c1bd178b
// Public key:  0375254407f4ff82a50be44c14bc109fe116b3628ec31584d8d20d49a21936b1ed
// 3
// Private key:  2e4f7c05b0bc8e3099c03dc83dc335ec78e07e1e0bba764ad567855c1f7c7537
// Public key:  02f2e848f24eb15fc3275ce2dc6a2cdf972b046a83c684951d1daca68354ab3470

const balances = {
  "02c45ddf1f7abe1f42e7b079e6f5e0de75f462ffb61ad3eca2a00c054f2ffcee6e": 100,
  "0375254407f4ff82a50be44c14bc109fe116b3628ec31584d8d20d49a21936b1ed": 50,
  "02f2e848f24eb15fc3275ce2dc6a2cdf972b046a83c684951d1daca68354ab3470": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  let [sig, recv] = signature.split("::");
  let sigObj = secp.Signature.fromCompact(sig).addRecoveryBit(parseInt(recv));
  let transaction = {
    recipient: recipient,
    amount: amount.toString(),
  };
  const messageHash = keccac256(utils.utf8ToBytes(JSON.stringify(transaction)));
  let publicKey = sigObj.recoverPublicKey(messageHash).toHex();
  if(sender !== publicKey) {
    res.status(400).send({message: `Invalid signature, expected: ${sender}, actual: ${publicKey}`})
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
