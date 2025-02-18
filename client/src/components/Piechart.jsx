import { useState, useEffect } from 'react';
import { 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip,
    Legend } from 'recharts';

function Piechart({dataset}){
    const [chartData, setChartData] = useState([]);

    const prepareData = () => {
        const count = {};
        dataset.forEach((item) => {
            const subbasin = item.Subbasin;
            const area = parseFloat(item.AreaC);

            if (count[subbasin]) {
                count[subbasin] += area; // Sum AreaC for each subbasin
            } else {
                count[subbasin] = area; // Initialize AreaC for the subbasin
            }
        });

        const chartData = Object.keys(count).map((subbasin) => ({
            name: `Subbasin ${subbasin}`,
            value: count[subbasin],
        }));

        setChartData(chartData);
    };

    useEffect(() => {
        prepareData();
    }, []);

    const COLORS = ['#f9cdd4', '#eca1ac', '#e27589', '#b25b6e', '#7c3042'];

    // Calculate total value for percentage calculation
    const totalValue = chartData.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div>
            <ResponsiveContainer width='100%' height={150}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => {
                            const percentage = ((value / totalValue) * 100).toFixed(0);
                            return `${name} (${percentage}%)`;
                        }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />      
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Piechart;