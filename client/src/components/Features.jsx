import { 
    ArrowDownward, 
    ArrowUpward, 
    ChangeCircle,
    ReceiptLong,
    Share,
    Wallet } from "@mui/icons-material";

function Features(){
    return(
        <div className="feature home-menu">
            <div className="feature-container">
                <div className="feature-item">
                    <div className="item-icon">
                        <Wallet className="icon-bg" />
                    </div>
                    <div className="item-content">
                        <span className="feature-title">
                            Total NFTs Created
                        </span>
                        <div className="feature-stats-container">
                            <span className="feature-stats">
                                54
                            </span>
                            <span className="feature-stats-rate">
                                -5.5 <ArrowDownward className="feature-icon negative" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="item-icon">
                        <Share className="icon-bg" />
                    </div>
                    <div className="item-content">
                        <span className="feature-title">
                            Total NFTs Shared
                        </span>
                        <div className="feature-stats-container">
                            <span className="feature-stats">
                                60
                            </span>
                            <span className="feature-stats-rate">
                                -1.5 <ArrowDownward className="feature-icon negative" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="item-icon">
                        <ChangeCircle className="icon-bg" />
                    </div>
                    <div className="item-content">  
                        <span className="feature-title">
                            Total NFTs Traded
                        </span>
                        <div className="feature-stats-container">
                            <span className="feature-stats">
                                10
                            </span>
                            <span className="feature-stats-rate">
                                -1.5 <ArrowDownward className="feature-icon negative" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="item-icon">
                        <ReceiptLong className="icon-bg" />
                    </div>
                    <div className="item-content">
                        <span className="feature-title">
                            Total Transactions
                        </span>
                        <div className="feature-stats-container">
                            <span className="feature-stats">
                                200
                            </span>
                            <span className="feature-stats-rate">
                                +2.5 <ArrowUpward className="feature-icon" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;