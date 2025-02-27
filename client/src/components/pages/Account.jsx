import { Button, Typography, Card, CardContent, Grid } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import GalleryIcon from '@mui/icons-material/PhotoLibrary';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { VerifiedUser } from '@mui/icons-material';
import { useEth } from '../../contexts/EthContext';
import { MintNFT, TransferNFT } from "../structure/NFT";
import "./css/account.css";
import { useEffect, useState } from 'react';
 
function Account() {
    const {state} = useEth();
    const {tokens, setTokens} = useState([]);
    const account = state.accounts[0]; 
    const amount = 45;
    const active = "1.25%";
    const transactions = [
        { id: 1, type: 'Minted NFT', amount: 10, date: '2023-10-01' },
        { id: 2, type: 'Transferred Rights', amount: 5, date: '2023-09-25' },
        { id: 3, type: 'Minted NFT', amount: 15, date: '2023-09-20' },
    ];

    const fetchUserTokens = async () =>{
        const list = await state.contract2.methods.fetchUserTokens(account).send(
            { 
                from: state.accounts[0] 
            }
        );
        
        console.log(`list of NFT: ${JSON.stringify(list)}`);
    }

    useEffect(()=>{
        fetchUserTokens();
    },[tokens]);

    return (
        <div className="wallet">
            <div className="wallet-wrapper">
                <div className="wallet-section section-half">
                    <Typography variant="h4">
                        <VerifiedUser />
                        Account <br />
                        <span style={{ width: '10px'}}>
                            {account}
                        </span>
                    </Typography>
                    <Typography variant="h6">
                        <AccountBalanceWalletIcon /> Amount: ${amount}
                    </Typography>
                    <Typography variant="h6">
                        Active: {active}
                    </Typography>
                </div>

                <div className="wallet-section section-half">
                    <Typography variant="h5">Create an NFT</Typography>
                    <MintNFT type={'self'} />
                </div>

                <div className="wallet-section">
                    <Typography variant="h5">
                        <HistoryIcon /> Transaction History
                    </Typography>
                    <div className="transaction-list">
                        {transactions.map(transaction => (
                            <Card key={transaction.id} variant="outlined" style={{ margin: '10px 0' }}>
                                <CardContent>
                                    <Typography variant="body1">{transaction.type}</Typography>
                                    <Typography variant="body2">Amount: {transaction.amount} | Date: {transaction.date}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="wallet-section">
                    <Typography variant="h5">
                        <GalleryIcon /> My Water Quality NFTs
                    </Typography>
                    {/* Placeholder for NFT Gallery */}
                    <div className="nft-gallery">
                        {/* Add NFT cards or images here */}
                        <Typography variant="body2">No NFTs created yet.</Typography>
                    </div>
                </div>

                <div className="wallet-section">
                    <Typography variant="h5">
                        <TransferWithinAStationIcon /> Transfer Water Rights
                    </Typography>
                    <TransferNFT/>
                    <Button variant="contained" color="primary">
                        Transfer Rights
                    </Button>
                </div>

                <div className="wallet-section">
                    <Typography variant="h5">
                        <NotificationsIcon /> Notifications
                    </Typography>
                    <Typography variant="body2">No new notifications.</Typography>
                </div>
            </div>
        </div>
    );
}

export default Account;