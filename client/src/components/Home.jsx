import Transaction from "./Transaction";
import Features from "./Features";
import Banner from "./Banner.jsx";
import { 
    riverData,
    nitrogenData,
    ammoniumData, 
    phosphorusData} from "../../utils/river.data.js";
import { 
    MyAreaChart, 
    MyBarChart,
    MyPolarChart,
    MyRadarChart,
    ConcentrationPieChart} from "./Chart.jsx";
import backgroundImage from "./../assets/background.png";

function Home(){
    return(
        <div className="home">
            <div 
                className="section-menu">
                    <Features/></div>
            <div 
                className="home-section section-banner">
                    <Banner/></div>
            <div 
                className="home-section section-chartR">
                 <MyRadarChart data={riverData}/> </div>
            <div 
                className="home-section section-chartA">
                    <MyAreaChart 
                        data1={nitrogenData}
                        data2={ammoniumData} /></div>
            <div 
                className="home-section section-chartP">
                    <MyPolarChart 
                        data1={nitrogenData}
                        data2={phosphorusData}
                        data3={ammoniumData}/></div>
            <div 
                className="home-section section-chartB">
                    <MyBarChart 
                        data1={nitrogenData}
                        data2={phosphorusData}/></div>
            <div 
                className="home-section section-chartL">
                    <ConcentrationPieChart 
                        data1={nitrogenData}
                        data2={phosphorusData}
                        data3={ammoniumData}/>
                    </div>
        </div>
    );
}

export default Home;