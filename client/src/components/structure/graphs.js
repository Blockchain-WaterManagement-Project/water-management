import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { number } from "echarts";

export function BarChart({ data }) {
  const option = {
    title: {
      text: "Total Nitrogen Load Across Regions",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.RCH),
      name: "Region",
    },
    yAxis: {
      type: "value",
      name: "Total Nitrogen Load (kg)",
    },
    series: [
      {
        name: "Total Nitrogen Load",
        type: "bar",
        data: data.map((item) => item.Total_Nitrogen_Load),
        itemStyle: {
          color: "#5470C6",
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function LineChart({ data }) {
  const regions = data.map((region) => `Region ${region.RCH}`);
  const nh4Values = data.map((region) => region.NH4_OUTkg);
  const no3Values = data.map((region) => region.NO3_OUTkg);
  const no2Values = data.map((region) => region.NO2_OUTkg);
  const orgnValues = data.map((region) => region.ORGN_OUTkg);

  const option = {
    title: {
      text: "Property Comparison Across Regions",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["NH4_OUTkg", "NO3_OUTkg", "NO2_OUTkg", "ORGN_OUTkg"],
      orient: "vertical",
      left: "bottom",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: regions,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "NH4_OUTkg",
        type: "bar",
        data: nh4Values,
        itemStyle: {
          color: "#5470C6",
        },
      },
      {
        name: "NO3_OUTkg",
        type: "bar",
        data: no3Values,
        itemStyle: {
          color: "#70C654",
        },
      },
      {
        name: "NO2_OUTkg",
        type: "bar",
        data: no2Values,
        itemStyle: {
          color: "#F77676",
        },
      },
      {
        name: "ORGN_OUTkg",
        type: "bar",
        data: orgnValues,
        itemStyle: {
          color: "#FFDC60",
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function NitrogenChart({ data }) {
  const regions = data.map((region) => `Region ${region.RCH}`);
  const nh4Values = data.map((region) => region.NH4_OUTkg);
  const no3Values = data.map((region) => region.NO3_OUTkg);
  const no2Values = data.map((region) => region.NO2_OUTkg);
  const orgnValues = data.map((region) => region.ORGN_OUTkg);

  const option = {
    title: {
      text: "Concentration Across Different Regions.",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["NH4_OUTkg", "NO3_OUTkg", "NO2_OUTkg", "ORGN_OUTkg"],
      orient: "vertical",
      left: "bottom",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: regions,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "NH4_OUTkg",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: nh4Values,
      },
      {
        name: "NO3_OUTkg",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: no3Values,
      },
      {
        name: "NO2_OUTkg",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: no2Values,
      },
      {
        name: "ORGN_OUTkg",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: orgnValues,
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function PieChartLoad({ nitrogen, phosphorus, ammonium }) {
  const nitrogenLoad = nitrogen.map((region) => region.Total_Nitrogen_Load);
  const phosphorusLoad = phosphorus.map(
    (region) => region.Total_Phosphorus_Load,
  );

  const option = {
    title: {
      text: "Load",
      subtext: "Spatial distribution of Water Quality Indexes",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "bottom",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: nitrogenLoad, name: "Total Nitrogen Load" },
          { value: phosphorusLoad, name: "Total Phosphorus Load" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function PieChartConcentration({ nitrogen, phosphorus, ammonium }) {
  const nitrogenConcentration = nitrogen.map(
    (region) => region.Total_Nitrogen_Concentration,
  );
  const phosphorusConcentration = phosphorus.map(
    (region) => region.Total_Phosphorus_Concentration,
  );
  const ammoniumPhosphorus = ammonium.map(
    (region) => region.Ammonia_Nitrogen_Concentration,
  );

  const option = {
    title: {
      text: "Concentration",
      subtext: "Spatial distribution of Water Quality Indexes",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "bottom",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: nitrogenConcentration,
            name: "Total Nitrogen Concentration",
          },
          {
            value: phosphorusConcentration,
            name: "Total Phosphorus Concentration",
          },
          {
            value: ammoniumPhosphorus,
            name: "Total Ammonia Nitrogen Concentration",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function ScatterChart({ data1, type }) {
  const schema = [
    { name: "RCH", index: 0, text: "RCH" },
    { name: "AREAkm2", index: 1, text: "AREAkm2" },
    { name: "FLOW_OUTcms", index: 2, text: "FLOW_OUTcms" },
    { name: "NH4_OUTkg", index: 3, text: "NH4_OUTkg" },
    { name: "Volume", index: 4, text: "Volume" },
    { name: "Cs", index: 5, text: "Cs" },
    { name: "K", index: 6, text: "K" },
    {
      name: `Total_${type}_Concentration`,
      index: 7,
      text: `Total ${type} Concentration`,
    },
  ];

  const data = data1.map((item) => [
    item.RCH,
    item.AREAkm2,
    item.FLOW_OUTcms,
    item.NH4_OUTkg,
    item.Volume,
    item.Cs,
    item.K,
    item[`Total_${type}_Concentration`],
  ]);

  const itemStyle = {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "rgba(0,0,0,0.3)",
  };

  const option = {
    title: {
      text: type,
      subtext: "Correlation between FLOW_OUTcms & Total Concentration",
      left: "center",
    },
    color: ["#dd4444", "#fec42c", "#80F1BE"],
    grid: {
      left: "10%",
      right: 150,
      top: "18%",
      bottom: "10%",
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.7)",
      formatter: function (param) {
        var value = param.value;
        return (
          '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
          "Region " +
          value[0] +
          "<br>" +
          schema[2].text +
          ": " +
          value[2] +
          " cms<br>" +
          schema[7].text +
          ": " +
          value[7] +
          " mg/L<br>" +
          schema[1].text +
          ": " +
          value[1] +
          " km²<br>" +
          schema[3].text +
          ": " +
          value[3] +
          " kg<br>" +
          schema[4].text +
          ": " +
          value[4] +
          " m³<br>" +
          schema[5].text +
          ": " +
          value[5] +
          "<br>" +
          schema[6].text +
          ": " +
          value[6] +
          "<br>"
        );
      },
    },
    xAxis: {
      type: "value",
      name: "cms",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 10,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: "(mg/L)",
      nameLocation: "end",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 10,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: "FLOW_OUTcms & Total Concentration",
        type: "scatter",
        itemStyle: itemStyle,
        data: data,
      },
    ],
  };

  return <ReactEcharts option={option} />;
}

export function GaugeChart({ data, type }) {
  const [currentRegion, setCurrentRegion] = useState(0);
  const _type =
    type != "Ammonium Nitrogen" ? "Total_" + type : "Ammonia_Nitrogen";

  const totalNitrogenConcentration =
    data[currentRegion][`${_type}_Concentration`];

  const handleRegionChange = (index) => {
    index = parseInt(index);
    if (index == NaN) return;
    if (index < 1) return;
    if (index > 160) return;
    index--;
    setCurrentRegion(index);
  };

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 20,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 20,
          distance: -60,
          rotate: "tangential",
          formatter: function (value) {
            if (value === 15) {
              return "High";
            } else if (value === 10) {
              return "Medium";
            } else if (value === 5) {
              return "Low";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
          text: `Total ${type} Concentration`,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value) {
            return value.toFixed(2) + " mg/L";
          },
          color: "inherit",
        },
        data: [
          {
            value: totalNitrogenConcentration,
            name: `Region ${data[currentRegion].RCH}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <ReactEcharts option={option} />
      <div className="d-flex justify-content-center items-center w-full">
        <input
          type="text"
          className="text-center m-2"
          placeholder="---region---"
          onChange={(e) => handleRegionChange(e.target.value)}
        />
      </div>
    </div>
  );
}
