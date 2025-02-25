function Transaction({dataset}) {
    return (
        <div>
            <div className="">
                <div className="transaction-section">
                    <SearchBar onSearch={searchTerm}/>
                    <div className="sections-wrapper">
                        <div className="section-details">
                            <span>Ether Price: ${etherPrice} | </span>
                            <span>Transactions: <span className="transaction-count">{transactionCount}</span> | </span>
                            <span>Gas Price: <span className="gas-price">{gasPrice} ETH</span></span>
                        </div>
                        <div className="section-details">
                            <span>Market Cap: <span className="market-cap">{marketCap}</span> | </span>
                            <span>Difficulty: <span className="difficulty">{difficulty}</span> | </span>
                            <span>Hash Rate: <span className="hash-rate">{hashRate}</span></span>
                        </div>
                    </div>
                </div>
                <div className="transaction-section">
                    <div className="block-details">
                        <h3>
                            Latest Block (Last 2 Weeks)</h3>
                        <TableContainer component={Paper}>
                            <Table aria-label="transaction history table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Block</TableCell>
                                        <TableCell>Miner</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount (ETH)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div>
                        <h3>
                            Latest Transactions (Last 2 Weeks)</h3>
                        <TableContainer component={Paper}>
                            <Table aria-label="transaction history table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Transaction ID</TableCell>
                                        <TableCell>From Address</TableCell>
                                        <TableCell>To Address</TableCell>
                                        <TableCell>Amount (ETH)</TableCell>
                                        <TableCell>Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.map((tx, index) => (
                                        <TableRow key={index} tabIndex={0} role="row">
                                            <TableCell>{tx.txid}</TableCell>
                                            <TableCell>{tx.fromAddress}</TableCell>
                                            <TableCell>{tx.toAddress}</TableCell>
                                            <TableCell>{tx.amount}</TableCell>
                                            <TableCell>{tx.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;