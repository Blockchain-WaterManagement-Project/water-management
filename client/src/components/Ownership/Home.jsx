import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

export const Home = () =>{
    const { state: { contract2, accounts } } = useEth();
    const [result, setResult] = useState(null); // State variable to store the event result
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState({
        address: '',
        url: '',
    });
  
    // handle change events
    const handleChange = (e) => {
        const { name, value } = e.target;
        setToken({...token, [name]: value});
  
        if (/^\d+$|^$/.test(value)) {
            setToken({...token, [name]: value});
        }
    }

    // smart contract functions
    const mintNFT = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (token.address === "") {
            alert("Please enter account address.");
            return;
        }

        setLoading(true); // Set loading state
        const _value0 = token.address;
        const _value1 = token.url;

        try {
            const _result = await contract2.methods.mintNFT(_value0, _value1).send({ from: accounts[0] });

            // Get the block number from the result
            const blockNumber = _result.blockNumber;

            // Use getPastEvents to fetch the events emitted by the contract
            const events = await contract2.getPastEvents('DataCreated', {
                fromBlock: blockNumber,
                toBlock: blockNumber,
                filter: { _owner: accounts[0] }
            });

            // Store the first event in the result state variable
            if (events.length > 0) {
                setResult(events[0]); // Store the first event emitted
            } else {
                setResult(null); // No events emitted
            }
        } catch (error) {
            console.error(error);
            alert('Error minting NFT:', error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const updateNFT = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (token.address === "") {
            alert("Please enter account address.");
            return;
        }

        setLoading(true); // Set loading state
        const _value0 = token.address;
        const _value1 = token.url; // Assuming you want to update the URL

        try {
            const _result = await contract2.methods.updateNFT(_value0, _value1).send({ from: accounts[0] });

            // Get the block number from the result
            const blockNumber = _result.blockNumber;

            // Use getPastEvents to fetch the events emitted by the contract
            const events = await contract2.getPastEvents('NFTUpdated', {
                fromBlock: blockNumber,
                toBlock: blockNumber,
                filter: { _owner: accounts[0] }
            });

            // Store the first event in the result state variable
            if (events.length > 0) {
                setResult(events[0]); // Store the first event emitted
            } else {
                setResult(null); // No events emitted
            }
        } catch (error) {
            console.error(error);
            alert('Error updating NFT:', error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const burnNFT = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (token.address === "") {
            alert("Please enter account address.");
            return;
        }

        setLoading(true); // Set loading state
        const _value0 = token.address; // Assuming this is the NFT's address or ID to burn

        try {
            const _result = await contract2.methods.burnNFT(_value0).send({ from: accounts[0] });

            // Get the block number from the result
            const blockNumber = _result.blockNumber;

            // Use getPastEvents to fetch the events emitted by the contract
            const events = await contract2.getPastEvents('NFTBurned', {
                fromBlock: blockNumber,
                toBlock: blockNumber,
                filter: { _owner: accounts[0] }
            });

            // Store the first event in the result state variable
            if (events.length > 0) {
                setResult(events[0]); // Store the first event emitted
            } else {
                setResult(null); // No events emitted
            }
        } catch (error) {
            console.error(error);
            alert('Error burning NFT:', error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const transferNFT = async (to, id) =>{}
    const fetchUserTokens = async (account) =>{}
    const fetchTokenURI = async (uri) =>{}
    const fetchNFTOwner = async (id) =>{}
  
    return (
      <div style={{height: '100vh'}}>
        <div style={{padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
            <div onClick={mintNFT} className="input-btn" style={{ width: '100%'}}>
                <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Water Quality Metrics Tokenization
                </h5>
                <p style={{ fontSize: '12px'}}>
                    Create a unique digital representation of your water quality metrics.</p>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter ethereum account address"
                    onChange={handleChange}
                    style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                /> <br/>
                <input
                    type="text"
                    name="url"
                    placeholder="Enter you data IPFS url location"
                    onChange={handleChange}
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
                    height: '450px',
                    padding: '10px 20px', 
                    margin: '10px auto',
                    color: '#eee', 
                    background: '#242424', 
                    borderRadius: '.5rem',
                    overflowY: 'scroll'}}>
                    {loading && <p>Loading...</p>}
                    {result && (
                        <div>
                            <h3>Event Emitted:</h3>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
            </div>
        </div>
      </div>
    );
}