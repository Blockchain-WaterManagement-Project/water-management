import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BarChart, LineChart} from '../structure/graphs';
import { nitrogen_data } from '../../data/sample.data';

export const Dashboard = () =>{
    return(
        <div className='container p-2'>
            <div className="row">
                {/* application sidebar */}
                <div className="col-sm-2">
                    <h5>Water Quality Monitoring</h5>
                    <ul className='list-group text-left'>
                        <li className='list-group-item active'>Dashboard</li>
                        <li className='list-group-item'>List Water Asset</li>
                        <li className='list-group-item'>Trade Water Asset</li>
                    </ul>
                </div>
                {/* application dashboard content */}
                <div className="col-sm-10">
                    <div className="row">
                        <div className='col-sm-12 d-flex justify-center items-center gap-3 p-2 mb-3'>
                            <div className='card' style={{ width: '18rem', height: '4rem'}}>
                                Total Nitrogen
                            </div>
                            <div className='card' style={{ width: '18rem', height: '4rem'}}>
                                Total Phosphorus
                            </div>
                            <div className='card' style={{ width: '18rem', height: '4rem'}}>
                                Total Ammonium Nitrogen
                            </div>                
                        </div>
                        <div className='col-sm-12 card p-2 mb-3' style={{height: '30rem'}}>
                            <h5>Time series of NH4_OUTkg across different regions.</h5>
                            <div>
                                <LineChart data={nitrogen_data}/>
                            </div>
                        </div>
                        <div className='col-sm-4 card p-2 mb-3' style={{ width: '28rem', height: '14rem'}}>
                            <h5>Comparison of Total Nitrogen Load across regions.</h5>
                        </div>
                        <div className='col-sm-4 card p-2 mb-3' style={{ width: '28rem', height: '14rem'}}>
                            <h5>Spatial distribution of Total Phosphorus Concentration.</h5>
                            <div>
                                <BarChart data={nitrogen_data}/>
                            </div>
                        </div>
                        <div className='col-sm-4 card p-2 mb-3' style={{ width: '28rem', height: '14rem'}}>
                            <h5>Correlation between FLOW_OUTcms and Total Nitrogen Concentration.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}