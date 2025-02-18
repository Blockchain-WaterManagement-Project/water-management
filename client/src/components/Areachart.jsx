import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

function Areachart({data}) {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'];

  return (
    <>
      <AreaChart width={1000} height={400} data={data}>
        <XAxis dataKey="Subbasin" />
        <YAxis dataKey="AreaC" />
        <Tooltip />
        {data.map((browser, index) => (
          <Area 
            key={browser}
            type="monotone"
            dataKey={"AreaC"}
            stackId="1"
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
          />
        ))}
      </AreaChart>
    </>
  )
}

export default Areachart;