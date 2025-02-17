import { AddLink, ChangeCircle, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, Report, Storefront, Timeline, TrendingUp, WorkOutline } from "@mui/icons-material";
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
                        <Link to="/" className="link"/>
                        <li className="sidebar-item active">
                            <LineStyle className="sidebar-icon" />
                            Home
                        </li>
                        <li className="sidebar-item">
                            <Timeline className="sidebar-icon" />
                            Transactions
                        </li>
                        <li className="sidebar-item">
                            <TrendingUp className="sidebar-icon" />
                            Tokens
                        </li>
                    </ul>
                </div>
                <div className="sidebar-menu">
                    <h3 className="sidebar-title">
                        Quick Menu
                    </h3>
                    <ul className="sidebar-list">
                        <Link to="/users" className="link"/>
                        <li className="sidebar-item">
                            <Storefront className="sidebar-icon" />
                            Marketplace
                        </li>
                        <Link to="/products" className="link"/>
                        <li className="sidebar-item">
                            <ChangeCircle className="sidebar-icon" />
                            Traded <sup className="icon-sup">NFT</sup>
                        </li>
                        <Link to="/transactions" className="link"/>
                        <li className="sidebar-item">
                            <AddLink className="sidebar-icon" />
                            Shared <sup className="icon-sup">NFT</sup>
                        </li>
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
                        <li className="sidebar-item">
                            <WorkOutline className="sidebar-icon" />
                            Manage
                        </li>
                        <li className="sidebar-item">
                            <Timeline className="sidebar-icon" />
                            Analytics
                        </li>
                        <li className="sidebar-item">
                            <Report className="sidebar-icon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;