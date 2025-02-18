import { useState } from "react";
import { 
    ResponsiveContainer, 
    LineChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    Line } from "recharts";

function Linechart({data}){
    const [opacity, setOpacity] = useState({
      Slo2: 1,
      Dep2: 1,
    });
  
    const handleMouseEnter = (o) => {
      const { dataKey } = o;
  
      setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
    };
  
    const handleMouseLeave = (o) => {
      const { dataKey } = o;
  
      setOpacity((op) => ({ ...op, [dataKey]: 1 }));
    };
  
    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            <Line type="monotone" dataKey="Dep2" strokeOpacity={opacity.Dep2} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Slo2" strokeOpacity={opacity.Slo2} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <p className="notes">Tips: Hover the legend !</p>
      </div>
    );
};

export default Linechart;