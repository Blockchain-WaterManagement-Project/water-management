import { 
    ChangeCircle, 
    Home, 
    Report, 
    Share, 
    Storefront, 
    Timeline, 
    Wallet, 
    WorkOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">
                        Dashboard
                    </h3>
                    <ul className="sidebar-list">
                        <Link to="/" className="link">
                            <li className="sidebar-item">
                                <Home className="sidebar-icon" />
                                <span>
                                    Home
                                </span>
                            </li>
                        </Link>
                        <Link to="/wallet" className="link">
                            <li className="sidebar-item">
                                <Wallet className="sidebar-icon" />
                                Wallet
                            </li>
                        </Link>
                        <Link to="/transaction" className="link">
                            <li className="sidebar-item">
                                <Timeline className="sidebar-icon" />
                                Transactions
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">
                        Quick Menu
                    </h3>
                    <ul className="sidebar-list">
                        <Link to="/marketplace" className="link">                 
                            <li className="sidebar-item">
                                <Storefront className="sidebar-icon" />
                                Marketplace
                            </li>
                        </Link>
                        <Link to="/trade" className="link">                 
                            <li className="sidebar-item">
                                <ChangeCircle className="sidebar-icon" />
                                Trade
                            </li>
                        </Link>
                        <Link to="/share" className="link">
                            <li className="sidebar-item">
                                <Share className="sidebar-icon" />
                                Share 
                            </li>
                        </Link>
                    </ul>
                </div>
                {/* <div className="sidebar-menu">
                    <h3 className="sidebar-title">
                        Notifications
                    </h3>
                    <ul className="sidebar-list">
                        <li className="sidebar-item">
                            <MailOutline className="sidebar-icon" />
                            Mail
                        </li>
                        <li className="sidebar-item">
                            <DynamicFeed className="sidebar-icon" />
                            Feedback
                        </li>
                        <li className="sidebar-item">
                            <ChatBubbleOutline className="sidebar-icon" />
                            Messages
                        </li>
                    </ul>
                </div> */}
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">
                        Staff
                    </h3>
                    <ul className="sidebar-list">
                        <Link to="manage">                       
                            <li className="sidebar-item">
                                <WorkOutline className="sidebar-icon" />
                                Manage
                            </li>
                        </Link>
                        <Link to='/analytic'>
                            <li className="sidebar-item active-item">
                                <Timeline className="sidebar-icon" />
                                Analytics
                            </li>
                        </Link>
                        <Link to="/report">                        
                            <li className="sidebar-item">
                                <Report className="sidebar-icon" />
                                Reports
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;