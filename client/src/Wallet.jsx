import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function onChangePrivateKey(e) {
    const privateKey = e.target.value;
    setPrivateKey(privateKey);
    console.log("selected public key: " + e.target.selectedOptions[0].text);
    setAddress(e.target.selectedOptions[0].text);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
   }
   // public/private keys generated from server/scripts/generate.js - public keys copied to server/index.js
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        <select onChange={onChangePrivateKey}>
          <option value="ffdf41701c0d5dff28313c69963e475616ed7c560e93b0f5bf545b7baa9ce278">039a954f59ca0d3a3fde3149214e82d6296b4e54b185d898a32760a2465ea39318</option>
          <option value="293260a4ddace9cca9e0271ec66c054fc60b86d145eeeb69cfe56ba9505c57b3">0220e4e97938ad34599e95fef72590744df94d84e60ee899e4df021a8b591cb89b</option>
          <option value="fd038f35611c6df4250ddd53c92592c678061d7843a086d52d58a14675c10333">02b0180b42fbbebb2f7490b308b21ab1d61809053090fb07bccdeccf3e3d59aea9</option>
        </select>

        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;