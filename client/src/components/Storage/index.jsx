import { useState } from "react";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

const client = create({
    protocol: 'http',
    host: 'localhost',
    port: '5001'
});

const Storage = () =>{
    const [formData, setFormData] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [imgOrg, setImgOrg] = useState();
    const [showFile, setShowFile] = useState();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveImgData = (data) =>{
        const _data = data;
        const reader = new FileReader();
        
        reader.readAsArrayBuffer(_data);

        reader.onloadend = () =>{
            console.log('data'+Buffer(reader.result));
            setImgOrg(Buffer(reader.result));
        }
    }

    const handleImgChange = (e) =>{
        const data = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(data);
        
        reader.onloadend = () =>{
            setImgPreview(reader.result);
        }

        saveImgData(e.target.files[0]);
    }

    const handleSaveImg = async (e) =>{
        e.preventDefault();
        console.log('saving image...');
        try {
            const created = await client.add(imgOrg);
            console.log(created);
            const url = `http://localhost:8080/ipfs/${created.path}`;
            setImgPreview(url);
            setFormData({...formData, ['image']: created.cid});
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleFileChange = (e) =>{
        const name = e.target.name;
        const data = e.target.files[0];
        const reader = new FileReader();

        reader.readAsText(data);

        reader.onloadend = () =>{
            setFormData({...formData, [name]: reader.result});
            setShowFile(reader.result);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('This is the data you want to store to IPFS');
        console.log(JSON.stringify(formData));
    }

    // view file: http://localhost:8080/ipfs
    return (
        <div style={{ display: 'flex'}}>
            <div style={{ flex: '.7'}}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px'}}>
                    Water Quality Metrics</h3>

                <form onSubmit={handleSaveImg}>
                    <div className="py-3 p-2 mb-3">
                        <span style={{ marginRight: '10px'}}>
                            Asset Avatar:</span>
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*"
                            style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                            onChange={handleImgChange} />
                    </div>
                    <button 
                        type="submit"
                        style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>
                            --- Save ---</button>
                </form>

                <form onSubmit={handleSubmit}>
                    <div className="py-3 p-2 mb-3">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter name of your digital asset"
                            style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                            onChange={handleChange} />
                    </div>
                    <div className="py-3 p-2 mb-3">
                        <input 
                            type="text" 
                            name="desc" 
                            placeholder="Enter description of your digital asset"
                            style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                            onChange={handleChange} />
                    </div>
                    <div className="py-3 p-2 mb-3">
                        <span style={{ marginRight: '10px'}}>
                            Asset Metrics:</span>
                        <input 
                            type="file" 
                            name="data" 
                            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.json"
                            style={{ width: '75%', margin: '10px auto', padding: '5px'}}
                            onChange={handleFileChange} />
                    </div>
                    <button 
                        type="submit"
                        style={{background: '#242424', color: '#eee', padding: '5px 30px', margin: 'auto 5px'}}>
                            --- Submit ---</button>
                </form>
            </div>
            <div style={{ flex: '.3'}}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <img 
                        src={imgPreview} 
                        alt="digital asset avatar"
                        style={{ width: '300px', height: '300px', borderRadius: '.5rem', margin: '.5rem 1rem'}} />
                    {showFile? showFile: 'No data is showing.'}
                </div>
            </div>
        </div>
    )
}

export default Storage;