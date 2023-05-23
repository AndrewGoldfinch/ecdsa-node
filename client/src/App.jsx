import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const keys = [
    {label:'039a954f59ca0d3a3fde3149214e82d6296b4e54b185d898a32760a2465ea39318',value: 'ffdf41701c0d5dff28313c69963e475616ed7c560e93b0f5bf545b7baa9ce278'},
    {label:'0220e4e97938ad34599e95fef72590744df94d84e60ee899e4df021a8b591cb89b', value: '293260a4ddace9cca9e0271ec66c054fc60b86d145eeeb69cfe56ba9505c57b32'},
    {label:'02b0180b42fbbebb2f7490b308b21ab1d61809053090fb07bccdeccf3e3d59aea9', value: 'fd038f35611c6df4250ddd53c92592c678061d7843a086d52d58a14675c103332'},
  ];

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setPrivateKey={setPrivateKey}
        privateKey={privateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey}/>
    </div>
  );
}

export default App;