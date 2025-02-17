import Transaction from "./Transaction";
import Features from "./Features";
import Banner from "./Banner.jsx";
import Chart from "./Chart";
import { userData } from "../../utils/river.data.js";

function Home(){
    return(
        <div className="home">
            <div>
                <Banner />
            </div>
            <Features />
            <Chart 
                data={userData} 
                title={'Token Creation Analytics (NFT)'} 
                grid
                dataKey={"Active User"} />
            <div className="home-transactions">
                <Transaction/>
            </div>
        </div>
    )
}

export default Home;