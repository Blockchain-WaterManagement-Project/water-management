import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export const MyBarChart = ({ data1, data2}) => {
    const option1 = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    const flowData = data1.map(item => item.FLOW_OUTcms);
    const nitrogenLoadData = data1.map(item => item.Total_Nitrogen_Load);
    const phosphorusLoadData = data2.map(item => item.Total_Phosphorus_Load);

    const xAxisData = data1.map(item => item.RCH);

const option = {
//   title: {
//     text: 'Nitrogen and Phosphorus Load with Flow',
//   },
  legend: {
    data: ['Flow (cms)', 'Total Nitrogen Load (kg)', 'Total Phosphorus Load (kg)'],
    textStyle: {
      color: '#fff'
    }
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack']
      },
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    splitLine: {
      show: false
    }
  },
  yAxis: {},
  series: [
    {
      name: 'Flow (cms)',
      type: 'bar',
      data: flowData,
      emphasis: {
        focus: 'series'
      },
      animationDelay: function (idx) {
        return idx * 10;
      }
    },
    {
        name: 'Total Nitrogen Load (kg)',
        type: 'bar',
        textStyle: {
          color: '#fff'
        },
        data: nitrogenLoadData,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    },
    {
        name: 'Total Phosphorus Load (kg)',
        type: 'bar',
        data: phosphorusLoadData,
        emphasis: {
            focus: 'series'
        },
        animationDelay: function (idx) {
            return idx * 10 + 200;
        }
    }
],
animationEasing: 'elasticOut',
animationDelayUpdate: function (idx) {
    return idx * 5;
}
};


    return (
        <ReactEcharts option={option} />
    )
}

export const MyPolarChart = ({ data1, data2}) => {
    const nitrogenLoadData = data1.map(item => item.Total_Nitrogen_Load);
    
    const phosphorusLoadData = data2.map(item => item.Total_Phosphorus_Load);


    const xAxisData = data1.map(item => item.RCH);

    const option = {
        angleAxis: {},
        radiusAxis: {
            type: 'category',
            data: xAxisData,
            z: 10
        },
        polar: {},
        series: [
            {
            type: 'bar',
            data: nitrogenLoadData,
            coordinateSystem: 'polar',
            name: 'Nitrogen Load',
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
            },
            {
            type: 'bar',
            data: phosphorusLoadData,
            coordinateSystem: 'polar',
            name: 'Phosphorus Load',
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
            }
        ],
        legend: {
            show: true,
            data: ['Nitrogen Load', 'Phosphorus Load'],
            textStyle: {
              color: '#fff'
            }
        }
    };

    return (
        <ReactEcharts option={option} />
    )
}

export const MyPieChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(()=>{
        console.log(chartRef);

        // init new chart instance
        chartInstanceRef.current = echarts.init(chartRef.current);

        // define chart options
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '70%'],
                    // adjust the start and end angle
                    startAngle: 180,
                    endAngle: 360,
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        };

        // apply options to chart
        chartInstanceRef.current.setOption(option);

        // cleanup function to dispose chart instance
        return () =>{
            chartInstanceRef.current.dispose();
        };

    }, [chartRef])

    return (
        <div ref={chartRef} style={{ width: '15rem', height: '15rem'}}></div>
    )
}


export const MyLineChart = () => {
    const colors = ['#5470C6', '#EE6666'];
    const option = {
        color: colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {},
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return (
                                'Precipitation  ' +
                                params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                            );
                        }
                    }
                },
                // prettier-ignore
                data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return (
                                'Precipitation  ' +
                                params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                            );
                        }
                    }
                },
                // prettier-ignore
                data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Precipitation(2015)',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
            },
            {
                name: 'Precipitation(2016)',
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                data: [
                    3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
                ]
            }
        ]
    };
    return (
        <ReactEcharts option={option} style={{height: '500px'}}/>
    )
}


export const MyAreaChart = ({data1, data2}) => {
    // data1 is nitrogen dataset
    // data2 is ammonia dataset

    const chart = useRef(null);
    const instance = useRef(null);

    const SubbasinID = data1.map(item => item.RCH);
    const flowData = data1.map(item => item.FLOW_OUTcms);
    const ammoniumDataForChart = data1.map(item => item.NH4_OUTkg);

    
    useEffect(()=>{
        // init new instance
        instance.current = echarts.init(chart.current);

        // define chart options
        const option1 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:[
                    'Area (sq units)',
                    'Length (m)',
                    'Slope',
                    'Width (m)',
                    'Depth (m)'
                ]
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
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

        const option = {
            // title: {
            //   text: 'Ammonium Flow & Output Relationship',
            //   left: 'center',
            //   textStyle: {
            //     color: '#fff' // Set the legend text color to red
            //   }
            // },
            grid: {
              bottom: 80
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                  backgroundColor: '#505765'
                }
              }
            },
            legend: {
              data: ['Flow (cms)', 'Ammonium Output (kg)'],
              left: 10,
              textStyle: {
                color: '#fff'
              }
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: 0,
                end: 100
              },
              {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
              }
            ],
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: false },
                data: SubbasinID
              }
            ],
            yAxis: [
              {
                name: 'Flow (m³/s)',
                type: 'value',
              },
              {
                name: 'Ammonium Output (kg)',
                nameLocation: 'start',
                alignTicks: true,
                type: 'value',
                inverse: true
              }
            ],
            series: [
              {
                name: 'Flow (cms)',
                type: 'line',
                areaStyle: {},
                lineStyle: {
                  width: 1
                },
                emphasis: {
                  focus: 'series'
                },
                data: flowData
              },
              {
                name: 'Ammonium Output (kg)',
                type: 'line',
                yAxisIndex: 1,
                areaStyle: {},
                lineStyle: {
                  width: 1
                },
                emphasis: {
                  focus: 'series'
                },
                data: ammoniumDataForChart
              }
            ]
        };

        // apply option to chart
        instance.current.setOption(option);

        // cleanup function to dispose
        return () =>{
            instance.current.dispose();
        }
    }, [chart])

    return (
        <div 
            ref={chart}
            style={{ width: '100%', height:"15rem"}}></div>
    )
}


export const MyRadarChart = ({data}) => {
    const chart = useRef(null);
    const instance = useRef(null);

    const indicators = [
        { text: 'Area (sq units)' },
        { text: 'Length (m)' },
        { text: 'Slope' },
        { text: 'Width (m)' },
        { text: 'Depth (m)' }
    ];

    const seriesData = data.map(data => ({
        value: [
            parseFloat(data.AreaC),
            parseFloat(data.Len2),
            parseFloat(data.Slo2),
            parseFloat(data.Wid2),
            parseFloat(data.Dep2)
        ]
    }));

    useEffect(()=>{
        // initialize a new chart
        instance.current = echarts.init(chart.current);

        // define chart options
        const option = {
            color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
            legend: {},
            radar: [
                {
                    indicator: indicators,
                    center: ['25%', '50%'],
                    radius: 120,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    axisName: {
                        formatter: '【{value}】',
                        color: '#428BD4'
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    }
                },
                {
                    indicator: indicators,
                    center: ['75%', '50%'],
                    radius: 120,
                    axisName: {
                        color: '#fff',
                        backgroundColor: '#666',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                }
            ],
            series: [
                {
                    type: 'radar',
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    },
                    data: seriesData
                },
                {
                    type: 'radar',
                    radarIndex: 1,
                    data: seriesData
                }
            ]
        };

        // apply the options
        instance.current.setOption(option);

        // cleanup function
        return () =>{
            instance.current.dispose();
        }
    }, [chart])

    return (
        <div 
            ref={chart}
            className="home-chartR" 
            style={{ width: '100%', height: '100%'}}></div>
    )
}

export const AnalyticsRadarChart = ({ data1, data2 }) => {
    // Prepare the series data for the radar chart
    const nitrogenData = data1.map(item => ({
        value: [
            item.Total_Nitrogen_Load, 
            item.Total_Nitrogen_Concentration,
            item.FLOW_OUTcms, 
            item.AREAkm2 
        ]
    }));

    const phosphorusData = data2.map(item => ({
        value: [
            item.Total_Phosphorus_Load, 
            item.Total_Phosphorus_Concentration,
            item.FLOW_OUTcms, 
            item.AREAkm2 
        ]
    }));

// Function to prepare funnel data
function prepareFunnelData(nitrogenData, phosphorusData) {
    const funnelData = [];
  
    nitrogenData.forEach(item => {
      funnelData.push({
        value: item.Total_Nitrogen_Concentration,
        name: `Nitrogen RCH ${item.RCH}`
      });
    });
  
    phosphorusData.forEach(item => {
      funnelData.push({
        value: item.Total_Phosphorus_Concentration,
        name: `Phosphorus RCH ${item.RCH}`
      });
    });
  
    return funnelData;
  }
  
  // Prepare the funnel data
  const funnelData = prepareFunnelData(nitrogenData, phosphorusData);
  
  // Funnel chart option
  const option = {
    title: {
      text: 'Funnel Chart for Nitrogen and Phosphorus Concentrations',
      left: 'left',
      top: 'bottom'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} mg/L'
    },
    toolbox: {
      orient: 'vertical',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: funnelData.map(item => item.name)
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '50%',
        data: funnelData
      },
      {
        name: 'Pyramid',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '5%',
        sort: 'ascending',
        data: funnelData
      }
    ]
  };

    return (
        <ReactEcharts option={option} />
    )
}

export const ConcentrationChart = ({ data, type }) => {
  const chart = useRef(null);
  const instance = useRef(null);
  // Function to normalize data
  const normalizeData = (data, maxValues) => {
    return data.map(item => {
      return {
        RCH: item.RCH,
        Total_Nitrogen_Concentration: (item.Total_Nitrogen_Concentration / maxValues.nitrogen) * 100,
        Ammonia_Nitrogen_Concentration: (item.Ammonia_Nitrogen_Concentration / maxValues.ammonia) * 100,
        Total_Phosphorus_Concentration: (item.Total_Phosphorus_Concentration / maxValues.phosphorus) * 100,
      };
    });
  };

  // Define maximum values for normalization
  const maxValues = {
    nitrogen: 20, // Example max value for Total Nitrogen Concentration
    ammonia: 1,   // Example max value for Ammonia Nitrogen Concentration
    phosphorus: 2, // Example max value for Total Phosphorus Concentration
  };

  // Function to visualize data based on type
  const visualizeData = (data, type) => {
    const normalizedData = normalizeData(data, maxValues);
    const chartData = normalizedData.map(item => ({
      name: `RCH ${item.RCH}`,
      value: type === 'nitrogen' ? item.Total_Nitrogen_Concentration :
             type === 'ammonia' ? item.Ammonia_Nitrogen_Concentration :
             item.Total_Phosphorus_Concentration
    }));

    // ECharts configuration
    const option = {
      title: {
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Concentration (Normalized)`,
        left: 'center',
        textStyle: {
          color: '#FFFFFF'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} %'
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name) // Use the names for the x-axis
      },
      yAxis: {
        type: 'value',
        name: 'Concentration (%)',
        min: 0,
        max: 100 // Normalized values will be between 0 and 100
      },
      series: [
        {
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Concentration`,
          type: 'bar',
          data: chartData.map(item => item.value),
          itemStyle: {
            color: type === 'nitrogen' ? '#67F9D8' : type === 'ammonia' ? '#FF917C' : '#FFE434'
          }
        }
      ]
    };

    return option;
  };

  // Determine the type of concentration based on the dataset structure
  let selectedType;
  if (data[1].Total_Nitrogen_Concentration !== undefined) {
    selectedType = 'nitrogen';
  } else if (data[0].Ammonia_Nitrogen_Concentration !== undefined) {
    selectedType = 'ammonia';
  } else if (data[0].Total_Phosphorus_Concentration !== undefined) {
    selectedType = 'phosphorus';
  } else {
    throw new Error('Invalid data structure');
  }

  useEffect(()=>{
    // initialize a new chart
    instance.current = echarts.init(chart.current);
    console.log(data);
    // define chart options
    const option = visualizeData(data, selectedType);

    // apply the options
    instance.current.setOption(option);

    // cleanup function
    return () =>{
        instance.current.dispose();
    }
}, [chart])

  return (
    <div 
    ref={chart}
    className="home-chartR" 
    style={{ width: '100%', height: '100%'}}></div>
  );
};

export const ConcentrationPieChart = ({ data1, data2, data3 }) => {
  // Function to calculate total concentrations
  const calculateTotalConcentrations = (data1, data2, data3) => {
    const totalNitrogen = data1.reduce((acc, item) => acc + item.Total_Nitrogen_Concentration, 0);
    const totalPhosphorus = data2.reduce((acc, item) => acc + item.Total_Phosphorus_Concentration, 0);
    const totalAmmonia = data3.reduce((acc, item) => acc + item.Ammonia_Nitrogen_Concentration, 0);

    return [
      { value: totalNitrogen, name: 'Total Nitrogen' },
      { value: totalAmmonia, name: 'Total Ammonia' },
      { value: totalPhosphorus, name: 'Total Phosphorus' }
    ];
  };

  // Create pie chart option
  const createPieChartOption = () => {
    const pieData = calculateTotalConcentrations(data1, data2, data3);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
    //   legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: pieData.map(item => item.name)
    //   },
      series: [
        {
          name: 'Concentration Sources',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: pieData.map(item => ({
            value: item.value,
            name: item.name,
            selected: item.name === 'Total Nitrogen'
          }))
        },
        {
          name: 'Concentration Sources',
          type: 'pie',
          radius: ['45%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            rich: {
              a: {
                color: '#e4e4e4',
                align: 'center'
              },
              b: {
                color: '#fff',
                fontSize: 14,
              },
              per: {
                color: '#fff',
              }
            }
          },
          data: pieData
        }
      ]
    };

    return option;
  };

  const option = createPieChartOption();

  return (
    <ReactEcharts option={option} />
  );
};

export const ConcentrationGaugeChart = ({ data1, data2, data3 }) => {
  // Function to calculate total concentrations
  const calculateTotalConcentrations = (data1, data2, data3) => {
    const totalNitrogen = data1.reduce((acc, item) => acc + item.Total_Nitrogen_Concentration, 0);
    const totalPhosphorus = data2.reduce((acc, item) => acc + item.Total_Phosphorus_Concentration, 0);
    const totalAmmonia = data3.reduce((acc, item) => acc + item.Ammonia_Nitrogen_Concentration, 0);

    return [
      { value: totalNitrogen, name: 'Total Nitrogen' },
      { value: totalAmmonia, name: 'Total Ammonia' },
      { value: totalPhosphorus, name: 'Total Phosphorus' }
    ];
  };

  // Create gauge chart option
  const createGaugeChartOption = () => {
    const gaugeData = calculateTotalConcentrations(data1, data2, data3);

    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData.map((item, index) => ({
            value: item.value,
            name: item.name,
            title: {
              offsetCenter: ['0%', `${index * 30 - 30}%`] // Adjust position based on index
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ['0%', `${index * 30 - 20}%`] // Adjust position based on index
            }
          })),
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    };

    return option;
  };

  const option = createGaugeChartOption();

  return (
    <ReactEcharts option={option} />
  );
};