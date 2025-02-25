import { useState } from "react";
import tokenImg from "./../../assets/token.jpg";

function Marketplace({ dataset }) {
    const [phRange, setPhRange] = useState([0, 14]);
    const [dissolvedOxygen, setDissolvedOxygen] = useState(0);
    const [turbidity, setTurbidity] = useState([0, 100]);
    const [location, setLocation] = useState('');
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    const handleFilterChange = () => {
        // Implement filtering logic based on the selected filters
    };

    return (
        <div className="marketplace">
            <div className="market-wrapper">
                <div className="marketplace-header">
                    <h1 className="header-title">NFT Marketplace</h1>
                </div>
                <div className="marketplace-body">
                    <div className="marketplace-filters">
                        <h3>Filters</h3>
                        <div className="filter">
                            <label>pH Range:</label>
                            <input
                                type="number"
                                value={phRange[0]}
                                onChange={(e) => setPhRange([Number(e.target.value), phRange[1]])}
                            />
                            <input
                                type="number"
                                value={phRange[1]}
                                onChange={(e) => setPhRange([phRange[0], Number(e.target.value)])}
                            />
                        </div>
                        <div className="filter">
                            <label>Dissolved Oxygen:</label>
                            <input
                                type="number"
                                value={dissolvedOxygen}
                                onChange={(e) => setDissolvedOxygen(Number(e.target.value))}
                            />
                        </div>
                        <div className="filter">
                            <label>Turbidity Range:</label>
                            <input
                                type="number"
                                value={turbidity[0]}
                                onChange={(e) => setTurbidity([Number(e.target.value), turbidity[1]])}
                            />
                            <input
                                type="number"
                                value={turbidity[1]}
                                onChange={(e) => setTurbidity([turbidity[0], Number(e.target.value)])}
                            />
                        </div>
                        <div className="filter">
                            <label>Location:</label>
                            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                                <option value="">Select Location</option>
                                <option value="Los Angeles River">Los Angeles River</option>
                                <option value="Hudson River">Hudson River</option>
                                <option value="San Francisco Bay">San Francisco Bay</option>
                                <option value="Miami River">Miami River</option>
                                <option value="Lake Michigan">Lake Michigan</option>
                            </select>
                        </div>
                        <div className="filter">
                            <label>Date Range:</label>
                            <input
                                type="date"
                                value={dateRange[0].toISOString().split('T')[0]}
                                onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
                            />
                            <input
                                type="date"
                                value={dateRange[1].toISOString().split('T')[0]}
                                onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
                            />
                        </div>
                        <button onClick={handleFilterChange}>Apply Filters</button>
                    </div>
                    <div className="marketplace-main">
                        {/* Map all NFTs */}
                        {dataset.map((nft) => (
                            <div className="nft-card" key={nft.nftId}>
                                <img
                                    src={nft.image || tokenImg}
                                    alt={nft.name}
                                    className="nft-image"
                                />
                                <h2 className="nft-title">{nft.name}</h2>
                                <p className="nft-description">{nft.description}</p>
                                <div className="nft-data">
                                    <p>pH: {nft.data.parameters.pH}</p>
                                    <p>Dissolved Oxygen: {nft.data.parameters.dissolvedOxygen}</p>
                                    <p>Turbidity: {nft.data.parameters.turbidity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
    );
}

export default Marketplace;