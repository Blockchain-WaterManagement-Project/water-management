import React from "react"
import ReactEcharts from "echarts-for-react"

export function BarChart({ data }){
    const option = {
        title: {
          text: 'Total Nitrogen Load Across Regions',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.RCH),
          name: 'Region',
        },
        yAxis: {
          type: 'value',
          name: 'Total Nitrogen Load (kg)',
        },
        series: [
          {
            name: 'Total Nitrogen Load',
            type: 'bar',
            data: data.map(item => item.Total_Nitrogen_Load),
            itemStyle: {
              color: '#5470C6',
            },
          },
        ],
      };
    
      return (<ReactEcharts option={option} />);
}

export function LineChart({ data }){
    const regions = data.map(region => `Region ${region.RCH}`);
    const nh4Values = data.map(region => region.NH4_OUTkg);

    const option = {
        title: {
        text: 'NH4_OUTkg Comparison Across Regions'
        },
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
        },
        legend: {
        data: ['NH4_OUTkg']
        },
        toolbox: {
        feature: {
            saveAsImage: {}
        }
        },
        grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
        },
        xAxis: {
        type: 'category',
        data: regions,
        name: 'Region'
        },
        yAxis: {
        type: 'value',
        name: 'NH4_OUTkg'
        },
        series: [
        {
            name: 'NH4_OUTkg',
            type: 'bar',
            data: nh4Values,
            itemStyle: {
            color: '#5470C6'
            }
        }
        ]
    };
  
    return (<ReactEcharts option={option} />);
};