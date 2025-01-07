import { useState } from "react";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import axios from "axios";

const client = create({
    protocol: 'http',
    host: 'localhost',
    port: '5001'
});

const Storage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        data: ""
    });
    const [imgPreview, setImgPreview] = useState();
    const [imgOrg, setImgOrg] = useState();
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null); // State to store the result

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImgChange = (e) => {
        const data = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
            setImgPreview(reader.result);
            saveImgData(data);
        };
    };

    const saveImgData = (data) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setImgOrg(Buffer(reader.result));
        };
    };

    const handleSaveImg = async (e) => {
        e.preventDefault();
        try {
            const created = await client.add(imgOrg);
            const url = `http://localhost:8080/ipfs/${created.path}`;
            setFormData({ ...formData, image: url });
            alert("Image saved successfully!");
        } catch (error) {
            console.error(error.message);
            setError("Failed to save image to IPFS.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.image || !formData.data) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/decentralize/add`, {
                content: JSON.stringify(formData)
            });
            setResult(response.data); // Store the result
            alert("NFT metadata submitted successfully!");
        } catch (error) {
            console.error(error);
            setError("Failed to submit NFT metadata.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
        alert("Data copied to clipboard!");
    };

    return (
        <div style={{ display: 'flex', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <div style={{ flex: '0.7', padding: '20px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
                    Prepare Water Quality Token (metadata)
                </h3>

                <form onSubmit={handleSaveImg} style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Asset Avatar:</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleImgChange} />
                    </div>
                    <button
                        type="submit"
                        style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                         save 
                    </button>
                </form>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name of your digital asset"
                            style ={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter description of your digital asset"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ marginRight: '10px' }}>Asset Metrics:</label>
                        <textarea
                            name="data"
                            placeholder="Enter encrypted water quality data"
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '100px' }}></textarea>
                    </div>
                    <button
                        type="submit"
                        style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        --- Submit Metadata ---
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {result && (
                    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <h4>Submitted Data:</h4>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                        <button onClick={copyToClipboard} style={{ background: '#007BFF', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Copy Data
                        </button>
                    </div>
                )}
            </div>
            <div style={{ flex: '0.3', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src={imgPreview}
                    alt="digital asset avatar"
                    style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
            </div>
        </div>
    );
};

export default Storage;