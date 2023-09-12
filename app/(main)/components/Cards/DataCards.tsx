"use client";
// import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';

import { Bar, Line, Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

interface StatCardProps {
  horizontal?:boolean;
  icon?: any;
  subtitle?: string;
  values: any;
  labels: any;
  title: string;
  statPercentage?: number;
  statDescription?: string;
  toggleChart: (val:string)=>void;
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
export const BarChartCard: React.FC<StatCardProps> = ({ title, subtitle, labels, values , toggleChart, horizontal = false}) => {
  const [expanded, setExpanded] = useState(false);
  const [chartToggle, setChartToggle] = useState("sales")
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: subtitle,
        backgroundColor: "#0000FF80",
        borderColor: "#29EF22",
        data: values //[0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  useEffect(() => {
    toggleChart(chartToggle)
  }, [chartToggle])


const barChartOption = {
  indexAxis: horizontal?'y' as const: 'x' as const,
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
        <div className='flex justify-end'>
          <select className='text-black right select shadow p-3 mx-3' value={chartToggle} onChange={(e)=>setChartToggle(e.target.value)}>
            <option value="sales">Sales</option>
            <option value="count">Customer Count</option>
          </select>
          </div>
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
  Line chart Card Component
*/
export const LineChartCard: React.FC<StatCardProps> = ({ title, subtitle, labels, values, toggleChart }) => {
  const [expanded, setExpanded] = useState(false);
  const [chartToggle, setChartToggle] = useState("sales")
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: subtitle,
        backgroundColor: "",
        borderColor: "#FF0000",
        data: values //[0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  useEffect(() => {
    toggleChart(chartToggle)
  }, [chartToggle])

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
          <div className='flex justify-end'>
          <select className='text-black right select shadow p-3 mx-3' value={chartToggle} onChange={(e)=>setChartToggle(e.target.value)}>
            <option value="sales">Sales</option>
            <option value="count">Customer Count</option>
          </select>
          </div>
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
export const PieChartCard: React.FC<StatCardProps> = ({ title }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#33FF9290",
        borderColor: "#29EF22",
        data: [0, 10, 5, 2, 20, 30, 45],
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
          <Pie data={data} width={10} height={10} />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="w-[300px] min-w-[500px] bg-white rounded shadow-md">
            <Pie data={data} width={10} height={10} className="p-4" />
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
