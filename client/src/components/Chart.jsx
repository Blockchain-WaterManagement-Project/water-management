import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

export const MyBarChart = () => {
    const option = {
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


export const MyAreaChart = () => {
    const chart = useRef(null);
    const instance = useRef(null);
    
    useEffect(()=>{
        // init new instance
        instance.current = echarts.init(chart.current);

        // define chart options
        const option = {
            title: {
                text: 'Stacked Area Chart'
            },
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
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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

        // apply option to chart
        instance.current.setOption(option);

        // cleanup function to dispose
        return () =>{
            instance.current.dispose();
        }
    }, [chart])

    return (
        <div ref={chart} style={{ width: '55rem', height:"15rem"}}></div>
    )
}


export const MyRadarChart = () => {
    const chart = useRef(null);
    const instance = useRef(null);

    useEffect(()=>{
        // initialize a new chart
        instance.current = echarts.init(chart.current);

        // define chart options
        const option = {
            color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
            legend: {},
            radar: [
                {
                    indicator: [
                        { text: 'Indicator1' },
                        { text: 'Indicator2' },
                        { text: 'Indicator3' },
                        { text: 'Indicator4' },
                        { text: 'Indicator5' }
                    ],
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
                    indicator: [
                        { text: 'Indicator1', max: 150 },
                        { text: 'Indicator2', max: 150 },
                        { text: 'Indicator3', max: 150 },
                        { text: 'Indicator4', max: 120 },
                        { text: 'Indicator5', max: 108 },
                        { text: 'Indicator6', max: 72 }
                    ],
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
                    data: [
                        {
                            value: [100, 8, 0.4, -80, 2000],
                            name: 'Data A'
                        },
                        {
                            value: [60, 5, 0.3, -100, 1500],
                            name: 'Data B',
                            areaStyle: {
                                color: 'rgba(255, 228, 52, 0.6)'
                            }
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 1,
                    data: [
                        {
                            value: [120, 118, 130, 100, 99, 70],
                            name: 'Data C',
                            symbol: 'rect',
                            symbolSize: 12,
                            lineStyle: {
                                type: 'dashed'
                            },
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                }
                            }
                        },
                        {
                            value: [100, 93, 50, 90, 70, 60],
                            name: 'Data D',
                            areaStyle: {
                                color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                    {
                                        color: 'rgba(255, 145, 124, 0.1)',
                                        offset: 0
                                    },
                                    {
                                        color: 'rgba(255, 145, 124, 0.9)',
                                        offset: 1
                                    }
                                ])
                            }
                        }
                    ]
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
        <div ref={chart} style={{ width: '35rem', height: '15rem'}}></div>
    )
}