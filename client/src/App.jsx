import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [transaction, setTransaction] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
          setBalance={setBalance}
          address={address}
          signature={signature}
          setSignature={setSignature}
          transaction={transaction}
          setTransaction={setTransaction}
      />
    </div>
  );
}

export default App;
