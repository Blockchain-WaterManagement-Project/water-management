import BannerIMG from "./../assets/banner.png";

function Banner(){
    return(
        <div className="banner">
            <div className="banner-content">
                <p className="banner-subtitle">
                    HydroExchange</p>
                <h3 className="banner-title">
                    Gateway Into Decentralized Water Trade
                </h3>
                <p className="banner-introduction">
                We ensures verifiable water quality ownership through NFTs. And smart contracts for timely and efficient data sharing. 
                </p>
                <button className="banner-button">
                    Learn More
                </button>
            </div>
            <div className="banner-image">
                <img 
                    src={BannerIMG} 
                    alt="banner image"
                    className="banner-icon" />
            </div>
        </div>
    )
}

export default Banner;