import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [tokenId, setTokenId] = useState({
    id: '',
    address: ''
  });

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleTokenChange = e => {
    const { name, value } = e.target;
    if (/^\d+$|^$/.test(value)) {
        setTokenId({...tokenId, [name]: value});
      }
  }

  const owners = async () => {
    const value = await contract.methods.owner().call({ from: accounts[0] });
    tokenId({...tokenId, address: value});
  };

  const accessRequest = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  const requestAccess = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (tokenId.id === "") {
      alert("Please enter a tokenID that you want to access.");
      return;
    }
    const _value = parseInt(tokenId);
    await contract.methods.requestAccess(_value).send({ from: accounts[0] });
  };

  const grantAccess = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (tokenId.address === "") {
      alert("Please enter a address to grant access.");
      return;
    }
    const _valueA = parseInt(tokenId.id);
    const _valueB = tokenId.address;

    await contract.methods.grantAccess(_valueA, _valueB).send({ from: accounts[0] });
  };

  const revokeAccess = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const _valueA = parseInt(inputValue);
    await contract.methods.write(_valueA).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={owners}>
        owner()
      </button>
      {/* handle requesting data access */}
      <div onClick={requestAccess} className="input-btn">
        Request Data Access(<input
          type="text"
          placeholder="Enter tokenId: uint256"
          value={tokenId.id}
          onChange={handleInputChange}
        />)
      </div>
      {/* handle granting data access */}
      <div onClick={grantAccess} className="input-btn">
        Grant Data Access(
        <input 
            type="text" 
            value={tokenId.id} 
            onChange={handleTokenChange} />
        <input 
            type="text" 
            value={tokenId.address} 
            onChange={handleTokenChange} />)
      </div>
      {/* handle revoking data access */}
      <div onClick={revokeAccess} className="input-btn">
        Revoke Data Access(
        <input 
            type="text" 
            value={tokenId.id} 
            onChange={handleTokenChange} />
        <input 
            type="text" 
            value={tokenId.address} 
            onChange={handleTokenChange} />)
      </div>
      {/* handle data access */}
      <div onClick={revokeAccess} className="input-btn">
        Access Data(
        <input 
            type="text" 
            value={tokenId.id} 
            onChange={handleTokenChange} />)
      </div>

    </div>
  );
}

export default ContractBtns;