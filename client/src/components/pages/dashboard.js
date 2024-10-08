import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BarChart,
  GaugeChart,
  LineChart,
  NitrogenChart,
  PieChartConcentration,
  PieChartLoad,
  ScatterChart,
} from "../structure/graphs";
import {
  nitrogen_data,
  phosphorus_data,
  ammonium_data,
} from "../../data/sample.data";

export const Dashboard = () => {
  return (
    <div className="container p-2">
      <div className="row">
        {/* application sidebar */}
        <div className="col-sm-2">
          <h5>Water Quality Monitoring</h5>
          <ul className="list-group text-left">
            <li className="list-group-item active">Dashboard</li>
            <li className="list-group-item active">Transactions</li>
            <li className="list-group-item">Search</li>
            <li className="list-group-item">Recent</li>
            <li className="list-group-item active">Functions</li>
            <li className="list-group-item">Verify Quality</li>
            <li className="list-group-item">Verity Owner</li>
            <li className="list-group-item active">Water Rights</li>
            <li className="list-group-item">List Rights</li>
            <li className="list-group-item">Trade Rights</li>
            <li className="list-group-item">Search Rights</li>
          </ul>
        </div>
        {/* application dashboard content */}
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center items-center gap-3 p-2 mb-3">
              <div className="card" style={{ width: "20rem" }}>
                <GaugeChart data={nitrogen_data} type={"Nitrogen"} />
                <h5
                  className="text-center text-uppercase mb-3"
                  style={{ fontSize: "1rem" }}
                >
                  Total Nitrogen
                </h5>
              </div>
              <div className="card border-0" style={{ width: "20rem" }}>
                <GaugeChart data={phosphorus_data} type={"Phosphorus"} />
                <h5
                  className="text-center text-uppercase mb-3"
                  style={{ fontSize: "1rem" }}
                >
                  Total Phosphorus
                </h5>
              </div>
              <div className="card" style={{ width: "20rem" }}>
                <GaugeChart data={ammonium_data} type={"Ammonium Nitrogen"} />
                <h5
                  className="text-center text-uppercase mb-3"
                  style={{ fontSize: "1rem" }}
                >
                  Total Ammonium Nitrogen
                </h5>
              </div>
            </div>
            <div className="col-sm-12 card p-2 mb-3">
              <div>
                <LineChart data={nitrogen_data} />
              </div>
            </div>
            <div className="col-sm-4 card p-2 mb-3">
              <ScatterChart data1={nitrogen_data} type={"Nitrogen"} />
            </div>
            <div className="col-sm-4 card p-2 mb-3">
              <ScatterChart data1={phosphorus_data} type={"Phosphorus"} />
            </div>
            <div className="col-sm-4 card p-2 mb-3">
              <ScatterChart data1={ammonium_data} type={"Ammonium Nitrogen"} />
            </div>
            <div className="col-sm-12 card p-2 mb-3">
              <NitrogenChart data={nitrogen_data} />
            </div>
            <div className="col-sm-6 card p-2 mb-3">
              <PieChartLoad
                nitrogen={nitrogen_data}
                phosphorus={phosphorus_data}
                ammonium={ammonium_data}
              />
            </div>
            <div className="col-sm-6 card p-2 mb-3">
              <PieChartConcentration
                nitrogen={nitrogen_data}
                phosphorus={phosphorus_data}
                ammonium={ammonium_data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
