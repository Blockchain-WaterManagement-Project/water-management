import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const Home = () =>{
    const { state: { contract, accounts } } = useEth();

    const [ tokenId, setTokenId ] = useState({
      id: '',
      address: ''
    });

    const [ token, setToken ] = useState({
        address: '',
        url: '',
        to: '',
    });

    const [ results, setResults ] = useState(); 
  
    // handle change events
    const handleChange = (e) => {
        const { name, value } = e.target;
        setToken({...token, [name]: value});
  
        if (/^\d+$|^$/.test(value)) {
            setTokenId({...token, [name]: value});
        }
    }

    const handleTokenChange = (e) => {
      const { name, value } = e.target;
      setTokenId({...tokenId, [name]: value});

      if (/^\d+$|^$/.test(value)) {
          setTokenId({...tokenId, [name]: value});
      }
    }

    // handle contract functions
    const mintNFT = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( token.address === "") {
            alert("Please enter account address.");
            return;
          }

          const _value0 = token.address;
          const _value1 = token.url;
          const _res = await contract.methods.mintNFT(_value0, _value1).send({ from: accounts[0] });
          setResults(_res);
    }

    const transferFrom = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( token.address === "") {
            alert("Please enter account address.");
            return;
          }

          const _value0 = token.address;
          const _value1 = token.url;
          const _value3 = token.to;
          const _res = await contract.methods.transferFrom(_value0, _value3, _value1).send({ from: accounts[0] });
          setResults(_res);
    }

    const getUserNFTs = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( token.address === "") {
            alert("Please enter account address.");
            return;
          }

          const _value0 = token.address;
          const _res = await contract.methods.getUserNFTs(_value0).send({ from: accounts[0] });
          setResults(_res);
    }

    const isMinted = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( tokenId.id === "") {
            alert("Please enter token id.");
            return;
          }

          const _value0 = tokenId.id;
          const _res = await contract.methods.isMinted(_value0).send({ from: accounts[0] });
          setResults(_res);
    }

    const ownerOf = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
          }
          if ( tokenId.id === "") {
            alert("Please enter account address.");
            return;
          }

          const _value0 = tokenId.id;
          const _res = await contract.methods.ownerOf(_value0).send({ from: accounts[0] });
          setResults(_res);
    }
  
    return (
      <div style={{display: 'flex'}}>
        <div style={{ padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
            <div onClick={mintNFT} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    contract Quality Metric Tokenization:
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User Address: uint256"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br/>
                <input
                    type="text"
                    name="url"
                    placeholder="Enter Remote Data Location: string"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={transferFrom} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Transfer Token Ownership:
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter Current Token Owner: address"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br/>
                <input
                    type="text"
                    name="url"
                    placeholder="Enter Remote Data Location: string"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br/>
                <input
                    type="text"
                    name="to"
                    placeholder="Enter New Token Owner: addresss"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
            <div onClick={getUserNFTs} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Fetch NFTs for User:
                </h5>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter User: address"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>
        </div>
        <div style={{ padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
            <div onClick={isMinted} style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Check If Token Is Registered:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Token ID: uint"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                />
                <button 
                    type="button"
                    style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>Submit</button>
            </div>

            <div onClick={ownerOf} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Fetch the owner of a token:
                </h5>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter Data: Token ID"
                    onChange={handleTokenChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br />
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
        </div>
      </div>
    );
}