import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const Home = () =>{
    const { state: { contract1, accounts } } = useEth();
    const [ tokenId, setTokenId ] = useState({
      id: '',
      address: ''
    });
    const [ tokenUrl, setTokenUrl ] = useState({
        id: '',
        url: '',
    });
    const [ tokenAddress, setTokenAddress ] = useState('');
    const [ results, setResults ] = useState(); 
  
    // handle change events
    const handleTokenChange = (e) => {
      const { name, value } = e.target;
      setTokenId({...tokenId, [name]: value});

      if (/^\d+$|^$/.test(value)) {
          setTokenId({...tokenId, [name]: value});
      }
    }

    const handleUrlChange = (e) => {
        const { name, value } = e.target;
        setTokenUrl({...tokenUrl, [name]: value});
    }

    const handleAddressChange = (e) => {
        const { value } = e.target;
        setTokenAddress(value);
    }

    // handle contract1 functions
    const owner = async () => {
        const value = await contract1.methods.owner().call({ from: accounts[0] });
        setResults(value);
    };

    const authorizedUsers = async (e) =>{
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (tokenAddress === "") {
            alert("Please enter user account address.");
            return;
        }
        const _value = tokenAddress;
        await contract1.methods.authorizedUsers(_value).send({ from: accounts[0] });
    }

    const addData = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( tokenUrl.url === "") {
            alert("Please enter data url.");
            return;
          }

          const _value0 = parseInt(tokenUrl.id);
          const _value1 = tokenUrl.url;
          const _res = await contract1.methods.addData(_value0, _value1).send({ from: accounts[0] });
          console.log(_res);
          setResults(_res);
    }

    const removeData = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }

        if ( tokenUrl.id === "") {
            alert("Please enter data token ID");
            return;
        }

          const _value0 = parseInt(tokenUrl.id);
          const _res = await contract1.methods.removeData(_value0).send({ from: accounts[0] });
          setResults(_res);
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
      const _res = await contract1.methods.addUser(_value).send({ from: accounts[0] });
      setResults(_res);
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
      const _res = await contract1.methods.removeUser(_value).send({ from: accounts[0] });
      setResults(_res);
    }

    const accessRequests = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( tokenId.address === "") {
            alert("Please enter data url.");
            return;
          }

          const _value1 = parseInt(tokenId.id);
          const _value0 = tokenId.address;
          const _res = await contract1.methods.addData(_value0, _value1).send({ from: accounts[0] });
          setResults(_res);
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
      const _res = await contract1.methods.isUserAuthorized(_value).send({ from: accounts[0] });
      setResults(_res);
    }
  
    return (
      <div style={{display: 'flex'}}>
        <div style={{ padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
            <div onClick={addUser} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Authorize User:
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User Address: uint256"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={removeUser} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Revoke User Authorization: 
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User Address: uint256"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={isUserAuthorized} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Check User Authorization:
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User Address: uint256"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div style={{ margin: '20px auto'}}>
                <div onClick={addData} className="input-btn" style={{ width: '100%'}}>
                    <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                        Add Data:
                    </h5>
                    <input
                        type="text"
                        name="id"
                        placeholder="Enter Data TokenID: uint256"
                        onChange={handleUrlChange}
                        style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                    /> <br />
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter Data Url: string"
                        onChange={handleUrlChange}
                        style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                    />
                    <button 
                        type="button"
                        style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
                </div>
                <div onClick={removeData} className="input-btn" style={{ width: '100%'}}>
                    <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                        Remove Data:
                    </h5>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter Data TokenID: uint256"
                        onChange={handleTokenChange}
                        style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                    />
                    <button 
                        type="button"
                        style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
                </div>
            </div>
            <div onClick={accessRequests} style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Check Access Requests:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Data: Token ID"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br />
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: Account Address"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
        </div>
        <div style={{ padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
            <div onClick={isUserAuthorized} style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Request Data Access:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Data: Token ID"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br />
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: Account Address"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={isUserAuthorized} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Grant Data Access:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Data: Token ID"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br />
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: Account Address"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={isUserAuthorized} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Revoke Data Access:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Data: Token ID"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br />
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: Account Address"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div 
                draggable
                style={{ 
                    width: '100%', 
                    height: '100px',
                    padding: '10px 20px', 
                    margin: '10px auto',
                    color: '#eee', 
                    background: '#242424', 
                    borderRadius: '.5rem'}}>
                {results? results : "Your results will be shown here..."}
            </div>
            <div>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: Account Address"
                    onChange={handleAddressChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    onClick={authorizedUsers}
                    style={{background: '#00FFFF', color: '#242424', padding: '5px 15px', border: 'none', fontWeight: '700'}}>Authorized Users</button>
                <button 
                    type="button"
                    style={{background: '#00FFFF', color: '#242424', padding: '5px 15px', margin: 'auto 5px', border: 'none', fontWeight: '700'}}>Get Users</button>
                <button 
                    type="button"
                    style={{background: '#00FFFF', color: '#242424', padding: '5px 15px', margin: 'auto 5px', border: 'none', fontWeight: '700'}}>Get Data</button>
                <button 
                    type="button"
                    style={{background: '#00FFFF', color: '#242424', padding: '5px 15px', margin: 'auto 5px', border: 'none', fontWeight: '700'}}>Get Urls</button>
                <button 
                    type="button"
                    onClick={owner}
                    style={{background: '#00FFFF', color: '#242424', padding: '5px 15px', border: 'none', fontWeight: '700'}}>Get Owner</button>
            </div>
        </div>
      </div>
    );
}