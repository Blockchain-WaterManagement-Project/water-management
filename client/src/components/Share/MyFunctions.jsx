import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function MyFunctions() {
  const { state: { contract, accounts } } = useEth();
  const [tokenId, setTokenId] = useState({
    id: '',
    address: ''
  });

  const handleTokenChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setTokenId({...tokenId, [name]: value});
    console.log(tokenId.address);

    if (/^\d+$|^$/.test(value)) {
        setTokenId({...tokenId, [name]: value});
    }
  }
 
  const addUser = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (tokenId.address === "") {
      alert("Please enter user account address.");
      return;
    }
    const _value = tokenId.address;
    await contract.methods.addUser(_value).send({ from: accounts[0] });
  }

  const removeUser = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (tokenId.address === "") {
      alert("Please enter user account address.");
      return;
    }
    const _value = tokenId.address;
    await contract.methods.removeUser(_value).send({ from: accounts[0] });
  }

  const isUserAuthorized = async (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (tokenId.address === "") {
      alert("Please enter user account address.");
      return;
    }
    const _value = tokenId.address;
    await contract.methods.isUserAuthorized(_value).send({ from: accounts[0] });
  }

  return (
    <div className="btns">
      <div onClick={addUser} className="input-btn" style={{ width: '100%'}}>
        Add User: <br />
        <input
          type="text"
          name="address"
          placeholder="Enter User Address: uint256"
          onChange={handleTokenChange}
        />
      </div>
      <div onClick={removeUser} className="input-btn" style={{ width: '100%'}}>
        Remove User: <br />
        <input
          type="text"
          name="address"
          placeholder="Enter User Address: uint256"
          onChange={handleTokenChange}
        />
      </div>
      <div onClick={isUserAuthorized} className="input-btn" style={{ width: '100%'}}>
        Check User Authorization: <br />
        <input
          type="text"
          name="address"
          placeholder="Enter User Address: uint256"
          onChange={handleTokenChange}
        />
      </div>
      <div>
        Results: <br />
        Token ID: {tokenId.id} <br />
        Token Address: {tokenId.address} <br />
      </div>
    </div>
  );
}

export default MyFunctions;