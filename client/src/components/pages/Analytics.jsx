import "./css/analytics.css";

function Analytics({dataset}){
    return(
        <div className="analytics">
            <div className="analytics-wrapper">
                
                <div className="analytics-sidebar">
                    <div className="analytics-section1">
                        <h5>{412}</h5>
                        <p>Total Transactions</p>
                    </div>
                    <div className="analytics-section">
                        <h5>{200}</h5>
                        <p>Total NFTs</p>
                    </div>
                    <div className="analytics-section">
                        <h5>{"32.4%"}</h5>
                        <p>Market Growth</p>
                    </div>
                    <div className="analytics-section">
                        <h6>Previous Week</h6>
                        <p>Total Transactions: {"8.5%"}</p>
                        <p>Total NFTs: {"2.5%"}</p>
                        <p>Market Growth: {"12.8%"}</p>
                    </div>
                </div>

                <div className="analytics-content">
                    <div className="analytics-section">
                        <h5>Transaction Types</h5>
                        Creation Transactions | Sharing Transactions | Trading Transaction
                    </div>
                    <div className="analytics-section">
                        <h5>Transactions Trends</h5>
                        Creation Transactions | 80%
                        Sharing Transactions | 10%
                        Trading Transactions | 10%
                    </div>
                    <div className="analytics-section">
                        <h5>Area Chart</h5>
                        <p>
                            Created NFTs | Shared NFTs | Traded NFTs | Transactions
                        </p>
                    </div>
                    <div className="analytics-section">
                        <h5>{"35"}</h5>
                        <p>NFTs Created</p>
                    </div>
                    <div className="analytics-section">
                        <h5>{'$100'}</h5>
                        <p>NFTs Market Value</p>
                    </div>
                    <div className="analytics-section">
                        <h5>{"7.5%"}</h5>
                        <p>NFTs Growth Rate</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Analytics;