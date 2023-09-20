"use client";
// import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";
import { getColor } from '@/app/utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface StatCardProps {
  data?:any;
  statTitle?:string;
  icon?: any;
  statPercentage?: number;
  statDescription?: string;
}
interface BarChartProps {
  horizontal?:boolean;
  icon?: any;
  subtitle: string[];
  values: any;
  labels: string[];
  title: string;
  statPercentage?: number;
  statDescription?: string;
}

interface PieChartProps {
  // horizontal?:boolean;
  // icon?: any;
  // subtitle: string[];
  values: number[];
  labels: string[];
  title: string;
  // statPercentage?: number;
  // statDescription?: string;
}

interface StackedBarChartProps {
  horizontal?:boolean;
  icon?: any;
  subtitle?: string;
  values: any;
  labels: any;
  title: string;
  statPercentage?: number;
  statDescription?: string;
  toggleChart?: (val:string)=>void;
}


 

/* 
  Header Stat Card Component 
*/
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  data,
  statTitle,
  statPercentage,
  statDescription,
}) => {
  return (
    <>
      <div className="w-full bg-white dark:bg-gray-900 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-red-500 dark:bg-gray-800 uppercase">
          {statTitle}
        </div>
        <div className="flex flex-col items-end justify-between px-4 mb-4">
          <div className="w-full flex flex-row justify-between align-middle items-center mb-4">
            <div className="text-gray-600 dark:text-white p-3 mr-4 rounded-full bg-gray-200 dark:bg-gray-700 border dark:border-green-500 border-gray-300">
              {icon}
            </div>
            {/* Data */}
            <div className="text-black dark:text-white font-light text-3xl">
              {data}
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-end">
            {/* Percentage */}
            <div className="text-green-500 font-bold text-md pl-2 w-auto border-b-2 border-l-2 border-gray-300 dark:border-gray-500">
              {statPercentage}%
            </div>
            {/* Description */}
            <div className="text-gray-500 text-sm">{statDescription}</div>
          </div>
        </div>
      </div>
    </>
  );
};

/* 
  Bar chart Card Component
*/
export const BarChartCard: React.FC<BarChartProps> = ({ title, subtitle, labels, values, horizontal = false}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let datasets = values.map((val:any, index:number)=>(
    {
    label: subtitle[index],
    backgroundColor: getColor(),
    borderColor: getColor(),
    data: val
  }
  ))

  const data = {
    labels, datasets
  };


const barChartOption = {
  indexAxis: horizontal?'y' as const: 'x' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

  return (
    <>
      <div
        className={`relative w-full bg-white dark:bg-gray-200 rounded-md shadow-md ${
          expanded ? "h-screen" : ""
        }`}
      >
        <div
          className={`w-full flex justify-between bg-red-500 dark:bg-gray-800 text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 uppercase`}
        >
          <h1 className="w-full text-center">{title}</h1>
          <span
            className="mx-2 flex-end text-white/50 hover:text-white font-bold rounded hover:cursor-pointer transition-all duration-150"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
          <Bar data={data} options={barChartOption} className="px-12 py-2" />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="md:w-[600px] w-full md:min-w-[1000px] bg-white rounded shadow-md">
            <Bar data={data} options={barChartOption} className="p-4" />
            <button
              className="w-full mt-8 mx-auto text-white/50 hover:text-white bg-red-400 hover:bg-red-500 text-xs font-bold p-4 uppercase text-center transition-all ease-in duration-150"
              onClick={handleExpandClick}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </>
  );
};



/* 
  Stacked Bar chart Card Component
*/
export const StackedBarChartCard: React.FC<StackedBarChartProps> = ({ title, labels, values}) => {
  const [expanded, setExpanded] = useState(false);
  const [chartToggle, setChartToggle] = useState("sales")
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
// console.log(values)
  // const modifiedValues = values.map(item => item.map(val=>val.name));
  // console.log(modifiedValues)

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       // data: values.map(item=>) //[500, 304,686,293,690,200],
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       // stack: 0,
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: modifiedValues[0],
  //       backgroundColor: 'rgb(75, 192, 192)',
  //       // stack:1,
  //     },
  //     {
  //       label: 'Dataset 3',
  //       data: modifiedValues[1],
  //       backgroundColor: 'rgb(53, 162, 235)',
  //       // stack:2,
  //     },
  //   ],
  // };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        // data: values.map(item=>) //[500, 304,686,293,690,200],
        backgroundColor: 'rgb(255, 99, 132)',
        // stack: 0,
      },
      {
        label: 'Dataset 2',
        data: [239, 748, 363,595,697,234],
        backgroundColor: 'rgb(75, 192, 192)',
        // stack:1,
      },
      {
        label: 'Dataset 3',
        data: [316, 849,858,234,450,583],
        backgroundColor: 'rgb(53, 162, 235)',
        // stack:2,
      },
    ],
  };



const barChartOption = {
  plugins: {
    title: {
      display: false,
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

  return (
    <>
      <div
        className={`relative w-full bg-white dark:bg-gray-200 rounded-md shadow-md ${
          expanded ? "h-screen" : ""
        }`}
      >
        <div
          className={`w-full flex justify-between bg-red-500 dark:bg-gray-800 text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 uppercase`}
        >
          <h1 className="w-full text-center">{title}</h1>
          <span
            className="mx-2 flex-end text-white/50 hover:text-white font-bold rounded hover:cursor-pointer transition-all duration-150"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
        <div className='flex justify-end'>
          <select className='text-black right select shadow p-3 mx-3' value={chartToggle} onChange={(e)=>setChartToggle(e.target.value)}>
            <option value="sales">Sales</option>
            <option value="count">Customer Count</option>
          </select>
          </div>
          {/* <Bar data={data} options={barChartOption} className="px-12 py-2" /> */}
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="md:w-[600px] w-full md:min-w-[1000px] bg-white rounded shadow-md">
            {/* <Bar data={data} options={barChartOption} className="p-4" /> */}
            <button
              className="w-full mt-8 mx-auto text-white/50 hover:text-white bg-red-400 hover:bg-red-500 text-xs font-bold p-4 uppercase text-center transition-all ease-in duration-150"
              onClick={handleExpandClick}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </>
  );
};


/* 
  Line chart Card Component
*/
export const LineChartCard: React.FC<BarChartProps> = ({ title, subtitle, labels, values }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let datasets = values.map((val:any, index:number)=>{
    let color = getColor()
    return ({
    label: subtitle[index],
    backgroundColor:color,
    borderColor: color,
    data: val
  }
)})
  const data = {
    labels, datasets
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <>
      <div
        className={`relative w-full bg-white dark:bg-gray-200 rounded-md shadow-md ${
          expanded ? "h-screen" : ""
        }`}
      >
        <div
          className={`w-full flex justify-between bg-red-500 dark:bg-gray-800 text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 uppercase`}
        >
          <h1 className="w-full text-center">{title}</h1>
          <span
            className="mx-2 flex-end text-white/50 hover:text-white font-bold rounded hover:cursor-pointer transition-all duration-150"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
          <Line options={lineChartOptions} data={data} className="px-12 py-2" />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="md:w-[600px] w-full md:min-w-[1000px] bg-white rounded shadow-md">
          <Line options={lineChartOptions} data={data} className="p-4" />
            <button
              className="w-full mt-8 mx-auto text-white/50 hover:text-white bg-red-400 hover:bg-red-500 text-xs font-bold p-4 uppercase text-center transition-all ease-in duration-150"
              onClick={handleExpandClick}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </>
  );
};
/* 
Pie chart Card Component 
*/
export const PieChartCard: React.FC<PieChartProps> = ({ title, labels, values }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const pieChartOption = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    }
  };
  const data = {
    labels,
    datasets: [
      {
        label: title,
        backgroundColor: values.map(item=>getColor(0.5)),
        data: values,
      },
    ],
  };

  return (
    <>
      <div
        className={`relative w-full m-2 bg-white dark:bg-gray-200 rounded-md shadow-md ${
          expanded ? "h-screen" : ""
        }`}
      >
        <div
          className={`w-full flex justify-between bg-red-500 dark:bg-gray-800 text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 uppercase`}
        >
          <h1 className="w-full text-center">{title}</h1>
          <span
            className="mx-2 flex-end text-white/50 hover:text-white font-bold rounded hover:cursor-pointer transition-all duration-150"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
          <Doughnut data={data} options={pieChartOption} width={10} height={10} />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="w-[300px] min-w-[500px] bg-white rounded shadow-md">
            <Doughnut data={data} options={pieChartOption}  width={10} height={10} className="p-4" />
            <button
              className="w-full mt-8 mx-auto text-white/50 hover:text-white bg-red-400 hover:bg-red-500 text-xs font-bold p-4 uppercase text-center transition-all ease-in duration-150"
              onClick={handleExpandClick}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </>
  );
};


/* 
  MultiBar chart Card Component
*/
export const MultiBarChartCard: React.FC<BarChartProps> = ({ title, subtitle, labels, values, horizontal = false}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // console.log(values)
  let firstValues = values.map((val:any) => val[0]);
  let secondValues = values.map((val:any) => val[1]);
  let thirdValues = values.map((val:any) => val[2]);

  let datasets =  [
    {
      label: firstValues.map((val:{name:string})=>val.name),
      backgroundColor: getColor(),
      data: firstValues.map((val:{totalQuantity:number})=>val.totalQuantity)
    },
    {
      label: secondValues.map((val:{name:string})=>val.name),
      backgroundColor: getColor(),
      data: secondValues.map((val:{totalQuantity:number})=>val.totalQuantity)
    },
    {
      label: thirdValues.map((val:{name:string})=>val.name),
      backgroundColor: getColor(),
      data: thirdValues.map((val:{totalQuantity:number})=>val.totalQuantity)
    }
  ]
  const data = {
    labels, datasets
  };


const barChartOption = {
  indexAxis: horizontal?'y' as const: 'x' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  }
};

  return (
    <>
      <div
        className={`relative w-full bg-white dark:bg-gray-200 rounded-md shadow-md ${
          expanded ? "h-screen" : ""
        }`}
      >
        <div
          className={`w-full flex justify-between bg-red-500 dark:bg-gray-800 text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-600 uppercase`}
        >
          <h1 className="w-full text-center">{title}</h1>
          <span
            className="mx-2 flex-end text-white/50 hover:text-white font-bold rounded hover:cursor-pointer transition-all duration-150"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
          <Bar data={data} options={barChartOption} className="px-12 py-2" />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="md:w-[600px] w-full md:min-w-[1000px] bg-white rounded shadow-md">
            <Bar data={data} options={barChartOption} className="p-4" />
            <button
              className="w-full mt-8 mx-auto text-white/50 hover:text-white bg-red-400 hover:bg-red-500 text-xs font-bold p-4 uppercase text-center transition-all ease-in duration-150"
              onClick={handleExpandClick}
            >
              Minimize
            </button>
          </div>
        </div>
      )}
    </>
  );
};