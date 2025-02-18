import { Publish } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Token(){
    return(
        <div className="token">
            <div className="token-title-container">
                <h3 className="token-title">
                    Token
                </h3>
                <Link to={'/newtoken'}>
                    <button className="token-add-button">
                        create
                    </button>
                </Link>
            </div>
            <div className="token-topbar">
                <div className="token-topbar-left">

                </div>
                <div className="token-topbar-right">
                    <div className="token-info-top">

                    </div>
                    <div className="token-info-bottom">
                        <div className="token-info-item">
                            <span 
                                className="token-info-key"></span>
                            <span 
                                className="token-info-value"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="token-bottom">
                <form className="token-form">
                    <div className="token-form-left">
                        <label>Token Name</label>
                        <input type="text" placeholder="Yellow River 02/2022-02/2025"/>
                        <label>Token Image</label>
                        <label>Token Owner</label>
                        <label>Description</label>
                    </div>
                    <div className="token-form-right">
                        <div className="token-upload">
                            <label for="file">
                                <Publish/>
                            </label>
                            <input 
                                type="file" 
                                id="file" 
                                style={{ 
                                    display: 'none'}} />
                        </div>
                        <button className="token-button">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Token;