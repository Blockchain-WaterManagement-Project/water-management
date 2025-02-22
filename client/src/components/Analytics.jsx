import { AnalyticsRadarChart, ConcentrationChart } from "./Chart";
import { 
    ammoniumData,
    nitrogenData, 
    phosphorusData } from "../../utils/river.data";

function Analytics(){
    return(
        <div className="analytics-container">
            <div 
                className="analytics-section analytics-chart">
                <ConcentrationChart 
                    data={nitrogenData} 
                    type='nitrogen'/>
            </div>
            <div 
                className="analytics-section analytics-chart">
                <ConcentrationChart 
                    data={phosphorusData}
                    type='phosphorus'/>
            </div>
            <div 
                className="analytics-section analytics-chart">
                <ConcentrationChart 
                    data={ammoniumData}
                    type='ammonia'/>
            </div>
            <div className="analytics-section">2</div>
            <div className="analytics-section">3</div>
            <div className="analytics-section">4</div>
        </div>
    )
}

export default Analytics;