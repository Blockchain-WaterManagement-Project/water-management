import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FileUpload from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TradeTable } from './Table';
import { tradeData } from '../../utils/river.data';


const TradeAndWaterQualityForm = () => {
    const [tradeDetails, setTradeDetails] = useState({ nftId: '', quantity: '' });
    const [waterQualityData, setWaterQualityData] = useState({ ph: '', turbidity: '' });

    const handleTradeChange = (e) => {
        setTradeDetails({ ...tradeDetails, [e.target.name]: e.target.value });
    };

    const handleWaterQualityChange = (e) => {
        setWaterQualityData({ ...waterQualityData, [e.target.name]: e.target.value });
    };

    const handleTradeSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle trade submission
        console.log('Trade Details Submitted:', tradeDetails);
    };

    const handleWaterQualitySubmit = (e) => {
        e.preventDefault();
        // Add logic to handle water quality data submission
        console.log('Water Quality Data Submitted:', waterQualityData);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">Trade Details</Typography>
                <form onSubmit={handleTradeSubmit}>
                    <TextField
                        label="NFT ID"
                        name="nftId"
                        value={tradeDetails.nftId}
                        onChange={handleTradeChange}
                        required
                    />
                    <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={tradeDetails.quantity}
                        onChange={handleTradeChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">Submit Trade</Button>
                </form>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5">Water Quality Data</Typography>
                <form onSubmit={handleWaterQualitySubmit}>
                    <TextField
                        label="pH Level"
                        name="ph"
                        value={waterQualityData.ph}
                        onChange={handleWaterQualityChange}
                        required
                    />
                    <TextField
                        label="Turbidity"
                        name="turbidity"
                        value={waterQualityData.turbidity}
                        onChange={handleWaterQualityChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">Submit Water Quality</Button>
                </form>
            </Grid>
        </Grid>
    );
};

const Trade = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [tradeDetails, setTradeDetails] = useState({ nftId: '', quantity: '', buyer: '', seller: '' });
    const [waterQualityData, setWaterQualityData] = useState({ ph: '', turbidity: '', file: null });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSourceChange = (event) => {
        setSelectedSource(event.target.value);
    };

    const handleTradeChange = (e) => {
        setTradeDetails({ ...tradeDetails, [e.target.name]: e.target.value });
    };

    const handleWaterQualityChange = (e) => {
        setWaterQualityData({ ...waterQualityData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setWaterQualityData({ ...waterQualityData, file: e.target.files[0] });
    };

    const handleTradeSubmit = (e) => {
        e.preventDefault();
        console.log('Trade Details Submitted:', tradeDetails);
        alert('Trade initiated!');
    };

    const handleWaterQualitySubmit = (e) => {
        e.preventDefault();
        console.log('Water Quality Data Submitted:', waterQualityData);
        alert('Water quality data submitted for verification!');
    };

    const handleAddNFT = () => {
        alert('Add NFT functionality triggered!');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Water Quality NFT Trading</Typography>
                </Toolbar>
            </AppBar>
            <Box p={2} sx={{ backgroundColor: '#83c9ff', p: 2, borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search by Water Source"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Filter by Water Source</InputLabel>
                            <Select
                                value={selectedSource}
                                onChange={handleSourceChange}
                                label="Filter by Water Source"
                                endAdornment={
                                    <IconButton>
                                        <FilterListIcon />
                                    </IconButton>
                                }
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="River A">River A</MenuItem>
                                <MenuItem value="Lake B">Lake B</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        onClick={handleAddNFT}
                    >
                        Add New NFT
                    </Button>
                </Box>

                <Box mt={4}>
                    <Typography variant="h5">Trade Details</Typography>
                    <form onSubmit={handleTradeSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="NFT ID"
                                    name="nftId"
                                    value={tradeDetails.nftId}
                                    onChange={handleTradeChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <AccountCircle />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={tradeDetails.quantity}
                                    onChange={handleTradeChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Buyer Address"
                                    name="buyer"
                                    value={tradeDetails.buyer}
                                    onChange={handleTradeChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <AccountCircle />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Seller Address"
                                    name="seller"
                                    value={tradeDetails.seller}
                                    onChange={handleTradeChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <AccountCircle />
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit Trade
                        </Button>
                    </form>
                </Box>

                <Box mt={4}>
                    <Typography variant="h5">Water Quality Data Verification</Typography>
                    <form onSubmit={handleWaterQualitySubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="pH Level"
                                    name="ph"
                                    value={waterQualityData.ph}
                                    onChange={handleWaterQualityChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Turbidity"
                                    name="turbidity"
                                    value={waterQualityData.turbidity}
                                    onChange={handleWaterQualityChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<FileUpload />}
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            Submit Water Quality
                        </Button>
                    </form>
                </Box>

                <Box mt={4} sx={{ backgroundColor: '#83c9ff', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6">Trade Details Summary</Typography>
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography><strong>NFT ID:</strong> {tradeDetails.nftId}</Typography>
                        <Typography><strong>Quantity:</strong> {tradeDetails.quantity}</Typography>
                        <Typography><strong>Buyer Address:</strong> {tradeDetails.buyer}</Typography>
                        <Typography><strong>Seller Address:</strong> {tradeDetails.seller}</Typography>
                    </Paper>
                </Box>
            </Box>
        </div>
    );
};

export default Trade;