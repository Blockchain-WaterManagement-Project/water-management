import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

const client = create();


export default function Upload(){
    const [file, setFile] = useState(null);
    const [urlArr, setUrlArr] = useState([]);
    const [nitrogen, setNitrogen] = useState({});
    const [ammonium, setAmmonium] = useState({});
    const [phosphorus, setPhosphorus] = useState({});
    const [saveNitrogen, setSaveNitrogen] = useState(false);
    const [savePhosphorus, setSavePhosphorus] = useState(false);
    const [saveAmmonium, setSaveAmmonium] = useState(false);
    const [asset, setAsset] = useState({
        name: '',
        avatar: null,
        RCH: '',
        AREAkm2: '',
        FLOW_OUTcms: '',
        Coefficient1: '',
        nitrogen: nitrogen,
        ammonium: ammonium,
        phosphorus: phosphorus
    })

    const handleRetrieveFile = (e) =>{
        const data = e.target.files[0];
        const reader = new window.FileReader();

        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
            setFile(Buffer(reader.result));
        }

        e.preventDefault();
    }

    const handleChangeInNitrogen = (e) =>{
        const {name, value} = e.target;
        setNitrogen({
            ...nitrogen,
            [name]: value
        })
    } 

    const handleChangeInPhosphorus = (e) =>{
        const {name, value} = e.target;
        setPhosphorus({
            ...phosphorus,
            [name]: value
        })
    } 

    const handleChangeInAmmonium = (e) =>{
        const {name, value} = e.target;
        setAmmonium({
            ...ammonium,
            [name]: value
        })
    }

    const handleSaveNitrogen = (e) =>{
        e.preventDefault();
        if(Object.keys(nitrogen).length === 0)return 
        setSaveNitrogen(true);
    }

    const handleSaveAmmonium = (e) =>{
        e.preventDefault(); 
        if(Object.keys(ammonium).length === 0)return
        setSaveAmmonium(true);
    }

    const handleSavePhosphorus = (e) =>{
        e.preventDefault();
        if(Object.keys(phosphorus).length !== 0)return
        setSavePhosphorus(true);
    }

    const handleSubmitAsset = async (e) =>{
        e.preventDefault();

        try {
            const result = await client.add(file);
            const url = `http://localhost:8080/ipfs/${result.path}`;
            if(!saveNitrogen) return console.log('enter nitrogen data');
            if(!saveAmmonium) return console.log('enter ammonium data');
            if(!savePhosphorus) return console.log('enter phosphorus data');

            console.log(`Image url: ${url}\nData data url:${asset}`);
        } catch (error) {
            console.log(error.message);
        }
    }


    return(
        <>
            <div className="App">
                <form onSubmit={handleSubmitAsset}>
                    <h5 className="text-center text-2xl mb-3">Sub-Basin Water Quality Information</h5>
                    {/* RCH: sub basin */}
                    <div className="relative">
                        <label htmlFor="RCH">Sub Basin</label>
                        <input 
                            type="text" 
                            name="RCH" 
                            placeholder="...constant..." onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* AREAkm2: sub basin area */}
                    <div className="relative">
                        <label htmlFor="AREAkm2">Area</label>
                        <input 
                            type="text" 
                            name="AREAkm2" 
                            placeholder="...constant...(km²)" onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* FLOW_OUTcms: sub basin flow rate */}
                    <div className="relative">
                        <label htmlFor="FLOW_OUTcms">Flow Rate</label>
                        <input 
                            type="text" 
                            name="FLOW_OUTcms" 
                            placeholder="...constant...(cms)" onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Coefficient for calculations */}
                    <div className="relative">
                        <label htmlFor="Coefficient1">Coefficient for Calculation</label>
                        <input 
                            type="text" 
                            name="Coefficient1" 
                            placeholder="...constant..." 
                            onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Volume of water in sub basin */}
                    <div className="relative">
                        <label htmlFor="Volume">Volume of Water in Sub Basin</label>
                        <input 
                            type="text" 
                            name="Volume" 
                            placeholder="...constant...(m³)" 
                            onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Avatar to represent sub basin */}
                    <div className="relative">
                        <label htmlFor="data">Image</label>
                        <input 
                            type="file" 
                            name="data" 
                            placeholder="...image..." onChange={handleRetrieveFile} 
                            className="d-block text-center mb-3 w-100"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Upload Image</button>
                </form>
                <div>
                    {urlArr.length !== 0?urlArr.map((item)=>(
                        <img src={item} alt="asset avatar" />
                    )): <i className="text-sm">Upload Water Asset</i>}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-start gap-5">
                {/* nitrogen input form */}
                <form onSubmit={handleSaveNitrogen}>
                    <h5 className="text-center text-lg mb-3">Nitrogen (N) Information</h5>
                    {/* NH4_OUTkg: amount of ammonium discharged */}
                    <div className="relative">
                        <label htmlFor="NH4_OUTkg">Discharged (NH4)</label>
                        <input 
                            type="text" 
                            name="NH4_OUTkg" 
                            placeholder="...constant... (NH4)" onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* NO3_OUTkg: amount of nitrate discharged */}
                    <div className="relative">
                        <label htmlFor="NO3_OUTkg">Discharged (NO3)</label>
                        <input 
                            type="text" 
                            name="NO3_OUTkg" 
                            placeholder="....constant...(NO3)" onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* NO2_OUTkg: amount of nitrite discharged */}
                    <div className="relative">
                        <label htmlFor="NO2_OUTkg">Discharged (NO2)</label>
                        <input 
                            type="text" 
                            name="NO2_OUTkg" 
                            placeholder="...constant...(NO2)" onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* ORGN_OUTkg: amount of organic nitrogen discharged */}
                    <div className="relative">
                        <label htmlFor="ORGN_OUTkg">Discharged Organic (N)</label>
                        <input 
                            type="text" 
                            name="ORGN_OUTkg" 
                            placeholder="...constant...(kg)" onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Total amount of nitrogen load */}
                    <div className="relative">
                        <label htmlFor="Total_Nitrogen_Load">Total Load (N)</label>
                        <input 
                            type="text" 
                            name="Total_Nitrogen_Load" 
                            placeholder="...constant...(sum of all forms)" onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Total concentration of nitrogen */}
                    <div className="relative">
                        <label htmlFor="Total_Nitrogen_Concentration">Total Concentration (N)</label>
                        <input 
                            type="text" 
                            name="Total_Nitrogen_Concentration" 
                            placeholder="...constant...(mg/L)" 
                            onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Sediment concentration of nitrogen */}
                    <div className="relative">
                        <label htmlFor="Cs">Sediment Concentration (N)</label>
                        <input 
                            type="text" 
                            name="Cs" 
                            placeholder="...constant..." 
                            onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Nitrogen transformation rate */}
                    <div className="relative">
                        <label htmlFor="K">Transformation Rate (N)</label>
                        <input 
                            type="text" 
                            name="K" 
                            placeholder="...constant..." 
                            onChange={handleChangeInNitrogen} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    <button 
                        type="submit"
                        className="btn btn-outline-primary">Save</button>{" "}
                </form>
                {/* phosphorus input form */}
                <form onSubmit={handleSavePhosphorus}>
                    <h5 className="text-center text-lg mb-3">Phosphorus (P) Information</h5>
                    {/* MINP_OUTkg: amount of mineral phosphorus  */}
                    <div className="relative">
                        <label htmlFor="MINP_OUTkg">Discharged Mineral (P)</label>
                        <input 
                            type="text" 
                            name="MINP_OUTkg" 
                            placeholder="...constant... (kg)" onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* ORGP_OUTkg : amount of organic phosphorus */}
                    <div className="relative">
                        <label htmlFor="ORGP_OUTkg">Discharged Organic (P)</label>
                        <input 
                            type="text" 
                            name="ORGP_OUTkg" 
                            placeholder="...constant...(kg)" onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Total Load of phosphorus in sub basin */}
                    <div className="relative">
                        <label htmlFor="Total_Phosphorus_Load">Total Load (P)</label>
                        <input 
                            type="text" 
                            name="Total_Phosphorus_Load" 
                            placeholder="...constant...(sum of all forms)" onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Total concentration of phosphorus in sub basin */}
                    <div className="relative">
                        <label htmlFor="Total_Phosphorus_Concentration">Total Concentration (P)</label>
                        <input 
                            type="text" 
                            name="Total_Phosphorus_Concentration" 
                            placeholder="...constant...(mg/L)" 
                            onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Sediment concentration of phosphorus in sub basin */}
                    <div className="relative">
                        <label htmlFor="Cs">Sediment Concentration (P)</label>
                        <input 
                            type="text" 
                            name="Cs" 
                            placeholder="...constant..." 
                            onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Phosphorus transformation rate */}
                    <div className="relative">
                        <label htmlFor="K">Transformation Rate (P)</label>
                        <input 
                            type="text" 
                            name="K" 
                            placeholder="...constant..." 
                            onChange={handleChangeInPhosphorus} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-outline-primary">Save</button>{" "}
                </form>
                {/* ammonium input form */}
                <form onSubmit={handleSaveAmmonium}>
                    <h5 className="text-left text-lg mb-3">Ammonia Nitrogen (NH3) Information</h5>
                    {/* Amount of ammonium discharged */}
                    <div className="relative">
                        <label htmlFor="NH4_OUTkg">Discharged (NH4)</label>
                        <input 
                            type="text" 
                            name="NH4_OUTkg" 
                            placeholder="...constant...(kg)" onChange={handleChangeInAmmonium} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Total concentration of ammonium nitrogen */}
                    <div className="relative">
                        <label htmlFor="Ammonia_Nitrogen_Concentration">Total Concentration (NH3)</label>
                        <input 
                            type="text" 
                            name="Ammonia_Nitrogen_Concentration" 
                            placeholder="...constant...(mg/L)" 
                            onChange={handleChangeInAmmonium} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Sediment Concentration of ammonium nitrogen */}
                    <div className="relative">
                        <label htmlFor="Cs">Sediment Concentration (NH3)</label>
                        <input 
                            type="text" 
                            name="Cs" 
                            placeholder="...constant..." 
                            onChange={handleChangeInAmmonium} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    {/* Ammonium Nitrogen transformation rate */}
                    <div className="relative">
                        <label htmlFor="K">Transformation Rate (NH3)</label>
                        <input 
                            type="text" 
                            name="K" 
                            placeholder="...constant..." 
                            onChange={handleChangeInAmmonium} 
                            className="d-block text-center mb-3 w-100" />
                    </div>
                    <button 
                        type="submit"
                        className="btn btn-outline-primary">Save</button>{" "}
                </form>
            </div>
        </>
    )
} 