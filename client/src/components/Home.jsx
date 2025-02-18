import Transaction from "./Transaction";
import Features from "./Features";
import Banner from "./Banner.jsx";
import { 
    riverData } from "../../utils/river.data.js";
import Linechart from "./LineChart.jsx";
import Barchart from "./Barchart.jsx";
import Piechart from "./Piechart.jsx";
import Areachart from "./Areachart.jsx";

function Home(){
    return(
        <div className="home">
            <div className="home-container">
                <div className="home-row home-features">
                    <Features />
                </div>
                <div className="home-row home-banner">
                    <Banner
                        className="home-welcome"/>
                    <Barchart 
                        data={riverData}
                        className="home-barchart"/>
                </div>
                <div className="home-row home-analytics">
                    <Areachart data={riverData} />
                </div>
                <div className="home-row home-report">
                    <Linechart 
                        data={riverData}
                        className="home-linechart" />
                    <Piechart dataset={riverData} />
                </div>
            </div>
            <div className="home-transactions">
                <Transaction/>
            </div>
        </div>
    );
}

export default Home;