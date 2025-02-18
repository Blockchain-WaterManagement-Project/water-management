import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Barchart({data, xaxis, yaxis, value}){
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={500 / 300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={xaxis || "Subbasin"} />
        <YAxis dataKey={yaxis || "AreaC"} />
        <Tooltip />
        <Bar
          dataKey={value || "AreaC"}
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;