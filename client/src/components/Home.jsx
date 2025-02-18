import Transaction from "./Transaction";
import Features from "./Features";
import Banner from "./Banner.jsx";
import { 
    riverData } from "../../utils/river.data.js";
import { 
    MyAreaChart, 
    MyBarChart, 
    MyLineChart,
    MyPieChart,
    MyRadarChart} from "./Chart.jsx";

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
                    <MyRadarChart/>
                </div>
                <div className="home-row home-analytics">
                    <MyAreaChart data={riverData} />
                </div>
                <div className="home-row home-report">
                    <MyLineChart 
                        data={riverData}
                        className="home-linechart" />
                    <MyPieChart />
                </div>
            </div>
            <div className="home-transactions">
                <MyBarChart />
            </div>
        </div>
    );
}

export default Home;