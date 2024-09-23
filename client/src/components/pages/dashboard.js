import React from 'react';

export const Dashboard = () =>{
    return(
        <div className="bg-black-700 grid grid-cols-12 text-white p-4">
            {/* application sidebar */}
            <div className="cols-span-3">
                Management
                <ul>
                    <li className='text-3xl'>Dashboard</li>
                    <li>List Water Asset</li>
                    <li>Trade Water Asset</li>
                </ul>
            </div>
            {/* application dashboard content */}
            <div className="cols-span-9">
                <div>
                    <div>Total Nitrogen</div>
                    <div>Total Phosphorus</div>
                    <div>Total Ammonia</div>                
                </div>
                <div>
                    <h5>Time series of NH4_OUTkg across different regions.</h5>
                </div>
                <div>
                    <h5>Comparison of Total Nitrogen Load across regions.</h5>
                </div>
                <div>
                    <h5>Spatial distribution of Total Phosphorus Concentration.</h5>
                </div>
                <div>
                    <h5>Correlation between FLOW_OUTcms and Total Nitrogen Concentration.</h5>
                </div>
            </div>
        </div>
    )
}