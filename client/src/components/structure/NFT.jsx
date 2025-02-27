import { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import { TextField, Button, FormControlLabel, Radio, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkIcon from '@mui/icons-material/Link';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from "react-router-dom";
import "./css/structure.css";

export function MintNFT() {
    const { state } = useEth();
    const ownerAddress = state.accounts[0];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        owner: ownerAddress,
        url: ""
    });
    const [loading, setLoading] = useState(false);
    const [mintType, setMintType] = useState('self');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.owner === "") return alert('NFT owner not specified!');

        setLoading(true);

        try {
            const result = await state.contract2.methods.mintNFT(formData.owner, formData.url).send(
                { 
                    from: state.accounts[0] 
                }
            );
            console.log("minting NFT successful:", result);
            setTimeout(() => {
                return navigate('/')
            }, 500);
        } catch (err) {
            console.error("problem minting NFT:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMintTypeChange = (e) => {
        const { value } = e.target;
        setMintType(value);

        if (value === 'self') {
            setFormData({ 
                ...formData, 
                owner: state.accounts[0] 
            });
        } else {
            setFormData({ 
                ...formData, 
                owner: "" 
            });
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="form-section section-type">
                    <FormControlLabel
                        control={
                            <Radio
                                value="self"
                                name="self"
                                checked={mintType === 'self'}
                                onChange={handleMintTypeChange}
                            />
                        }
                        label="Self"
                    />
                    <FormControlLabel
                        control={
                            <Radio
                                value="other"
                                name="other"
                                checked={mintType === 'other'}
                                onChange={handleMintTypeChange}
                            />
                        }
                        label="Other"
                    />
                </div>

                {mintType === 'other' && (
                    <div className="form-section section-text">
                        <TextField
                            variant="outlined"
                            name="owner"
                            placeholder="Enter NFT owner address"
                            value={formData.owner}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                                startAdornment: <AccountCircleIcon />,
                            }}
                            fullWidth
                        />
                    </div>
                )}
                <div className="form-section section-text">
                    <TextField
                        variant="outlined"
                        name="url"
                        placeholder="Enter NFT metadata url"
                        value={formData.url}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                            startAdornment: <LinkIcon />,
                        }}
                        fullWidth
                    />
                </div>

                <div className="form-section section-button">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} /> : <MonetizationOnIcon />}
                        style={{ transition: '0.3s' }} // Add transition for smooth effect
                    >
                        {loading ? "Minting..." : "Mint NFT"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function UpdateNFT() {
    const { state } = useEth();
    const [formData, setFormData] = useState({
        id: "",
        url: ""
    });
    const [loading, setLoading] = useState(false);
    const [mintType, setMintType] = useState('self');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await state.contract2.methods.updateNFT(formData.id, formData.url).send(
                { 
                    from: state.accounts[0] 
                }
            );

            console.log(
                "minting NFT successful\n", result);

        } catch (err) {
            console.error(
                "problem minting NFT\n", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMintTypeChange = (e) => {
        const { value } = e.target;
        setMintType(value);

        if (value === 'self') {
            setFormData(
                { 
                    ...formData, 
                    owner: state.accounts[0] 
                }
            );

        } else {
            setFormData(
                { 
                    ...formData, 
                    owner: "" 
                }
            );
        }
    };

    return (
        <div className="form">
            <form 
                onSubmit={handleSubmit}
                className="form-wrapper">
                <div className="mint-type">
                    <label>
                        <input
                            type="radio"
                            value="self"
                            checked={mintType === 'self'}
                            onChange={handleMintTypeChange}
                        />
                        self
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="other"
                            checked={mintType === 'other'}
                            onChange={handleMintTypeChange}
                        />
                        other
                    </label>
                </div>

                {mintType === 'other' && (
                    <div className="form-section section-text">
                        <input
                            type="text"
                            name="owner"
                            placeholder="Enter NFT owner address"
                            value={formData.owner}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}
                <div className="form-section section-text">
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter NFT metadata url"
                        value={formData.url}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-section section-button">
                    <button
                        type="submit"
                        disabled={loading}>
                        {loading ? "Minting..." : "Mint NFT"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export function TransferNFT(){
    const {state} = useEth();
    const [formData, setFormData] = useState(
        {
            id: "",
            to: ""
        }
    );
    const [listOfNFT, setListOfNFT] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await state.contract2.methods.transferNFT(formData.to, formData.id).send(
                { 
                    from: state.accounts[0] 
                }
            );

            console.log(
                "trasnfering NFT successful\n", result);

        } catch (err) {
            console.error(
                "problem transfering NFT\n", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchListOfNFT = async () =>{
        const list = await state.contract2.methods.fetchAllTokenIds().send(
            { 
                from: state.accounts[0] 
            }
        );
        
        console.log(`list of NFT: ${JSON.stringify(list)}`);
    }

    useEffect(()=>{
        fetchListOfNFT();
    }, [listOfNFT])

    return(
        <div className="transfer-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    {/* 
                     This section will have the list of NFTs on the blockchain. 
                    */}
                    <select 
                        name="" 
                        disabled="disabled">
                        <optgroup></optgroup>
                        <option value="1">
                            1
                        </option>
                        <option value="2">
                            2
                        </option>
                    </select>
                    <input 
                        type="text" 
                        name="id"
                        placeholder="Enter NFT ID"
                        onChange={handleInputChange} />
                </div>
                <div className="form-section">
                    <input 
                        type="text" 
                        name="to"
                        placeholder="Enter receiver address"
                        onChange={handleInputChange} />
                </div>
                <div className="form-section">
                    <button type="submit">
                        submit
                    </button>
                </div>
            </form>
        </div>
    )
}