import { Language, NotificationsNone, Settings } from "@mui/icons-material";

function Topbar(){
    return(
        <div className="topbar">
            <div className="topbar-container">
                <div className="topbar-left">
                    <span className="logo">
                        HydroExchange
                    </span>
                </div>
                <div className="topbar-right">
                    <div className="topicon-container">
                        <NotificationsNone />
                        <span className="topicon-badge">
                            2</span>
                    </div>
                    <div className="topicon-container">
                        <Language />
                        <span className="topicon-badge">
                            eng</span>
                    </div>
                    <div className="topicon-container">
                        <Settings />
                    </div>
                    <img 
                        src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="user avatar" className="topbar-avatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar;