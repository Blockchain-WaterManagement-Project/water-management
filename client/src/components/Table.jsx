import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Collapse, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.transaction_hash}</TableCell>
                <TableCell align="right">{row.block_number}</TableCell>
                <TableCell align="right">{row.from_address}</TableCell>
                <TableCell align="right">{row.to_address}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.gas_used}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                <TableCell align="right">
                    <button className="status-button">{row.status}</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Transaction Details
                            </Typography>
                            <Typography variant="body2">
                                {/* You can add more details about the transaction here */}
                                Transaction Hash: {row.transaction_hash}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function Row1(props) {
const { row } = props;
const [open, setOpen] = React.useState(false);

return (
<React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        <TableCell>{row.nft_id}</TableCell>
        <TableCell>{row.water_source}</TableCell>
        <TableCell align="right">{row.quality_index}</TableCell>
        <TableCell align="right">{row.ph_level}</TableCell>
        <TableCell align="right">{row.contaminants_mg_per_L}</TableCell>
        <TableCell align="right">{row.nft_price_eth}</TableCell>
        <TableCell align="right">{row.owner_address}</TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Additional Details
                    </Typography>
                    <Typography variant="body2">
                        Timestamp: {row.timestamp}
                    </Typography>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
</React.Fragment>
);
}

Row.propTypes = {
    row: PropTypes.shape({
        transaction_hash: PropTypes.string.isRequired,
        block_number: PropTypes.number.isRequired,
        from_address: PropTypes.string.isRequired,
        to_address: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        gas_used: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

Row1.propTypes = {
row: PropTypes.shape({
nft_id: PropTypes.number.isRequired,
water_source: PropTypes.string.isRequired,
quality_index: PropTypes.number.isRequired,
ph_level: PropTypes.number.isRequired,
contaminants_mg_per_L: PropTypes.number.isRequired,
timestamp: PropTypes.string.isRequired,
nft_price_eth: PropTypes.number.isRequired,
owner_address: PropTypes.string.isRequired,
}).isRequired,
};

export function TransactionTable({ dataset }) {
    return (
        <TableContainer component={Paper} className="tableWrapper">
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Transaction Hash</TableCell>
                        <TableCell align="right">Block Number</TableCell>
                        <TableCell align="right">From Address</TableCell>
                        <TableCell align="right">To Address</TableCell>
                        <TableCell align="right">Value (ETH)</TableCell>
                        <TableCell align="right">Gas Used</TableCell>
                        <TableCell align="right">Timestamp</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataset.map((transaction, index) => (
                        <Row key={index} row={transaction} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export function TokenTable({dataset}) {
return (
<TableContainer component={Paper} className="tableWrapper">
    <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>NFT ID</TableCell>
                <TableCell>Water Source</TableCell>
                <TableCell align="right">Quality Index</TableCell>
                <TableCell align="right">pH Level</TableCell>
                <TableCell align="right">Contaminants (mg/L)</TableCell>
                <TableCell align="right">NFT Price (ETH)</TableCell>
                <TableCell align="right">Owner Address</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {dataset.map((nft, index) => (
                <Row1 key={index} row={nft} />
            ))}
        </TableBody>
    </Table>
</TableContainer>
);
}

export function TradeTable({dataset}) {
    return (
        <TableContainer component={Paper} className="tableWrapper">
            <Table aria-label="NFT trade table">
                <TableHead>
                    <TableRow>
                        <TableCell>Trade ID</TableCell>
                        <TableCell>NFT ID</TableCell>
                        <TableCell>Buyer Address</TableCell>
                        <TableCell>Seller Address</TableCell>
                        <TableCell align="right">Trade Price (ETH)</TableCell>
                        <TableCell align="right">Trade Timestamp</TableCell>
                        <TableCell>Transaction Hash</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataset.map((trade) => (
                        <TableRow key={trade.trade_id}>
                            <TableCell>{trade.trade_id}</TableCell>
                            <TableCell>{trade.nft_id}</TableCell>
                            <TableCell>{trade.buyer_address}</TableCell>
                            <TableCell>{trade.seller_address}</TableCell>
                            <TableCell align="right">{trade.trade_price_eth}</TableCell>
                            <TableCell align="right">{trade.trade_timestamp}</TableCell>
                            <TableCell>{trade.transaction_hash}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}