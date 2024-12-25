import { useState } from "react";
import { useEth } from "../../contexts/EthContext";

const Update = () =>{
    const { state: { contract2, accounts } } = useEth();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState({
        address: '',
        url: '',
        id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToken({...token, [name]: value});
  
        if (/^\d+$|^$/.test(value)) {
            setToken({...token, [name]: value});
        }
    }

    const updateNFT = async (e) => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (token.id === "") {
            alert("Please enter account address.");
            return;
        }

        setLoading(true); // Set loading state
        const _value = token.id;
        const _value0 = token.url; // Assuming you want to update the URL

        try {
            const _result = await contract2.methods.updateNFT(_value, _value0).send({ from: accounts[0] });

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

    return(
        <div>
            <div style={{padding: '10px 20px', borderRadius: '2px', flex:'.5'}}>
                <div onClick={updateNFT} className="input-btn" style={{ width: '100%'}}>
                    <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                        UPDATE YOUR WATER QUALITY TOKEN DATA
                    </h5>
                    <p style={{ fontSize: '12px'}}>
                        Update the content of your unique water quality data digital representation.</p>
                    <input
                        type="text"
                        name="id"
                        placeholder="Enter asset token ID..."
                        onChange={handleChange}
                        style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                    /> <br/>
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter you data location url..."
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
    )
}

export default Update;