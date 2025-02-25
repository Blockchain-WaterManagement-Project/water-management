import { AnalyticsRadarChart, ConcentrationChart } from "./Chart";
import { 
    ammoniumData,
    nitrogenData, 
    phosphorusData, 
    tokenData, 
    transactionData} from "../../utils/river.data";
import { TokenTable, TransactionTable } from "./Table";

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
            <div className="analytics-section section-transaction">
                <TransactionTable dataset={transactionData}/>
            </div>
        </div>
    )
}

export default Analytics;