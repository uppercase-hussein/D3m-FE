"use client";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

interface StatCardProps {
  icon?: any;
  data?: number;
  statTitle: string;
  statPercentage?: number;
  statDescription?: string;
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
export const BarChartCard: React.FC<StatCardProps> = ({ statTitle }) => {
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
        backgroundColor: "#33FF92A1",
        borderColor: "#29EF22",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
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
          <h1 className="w-full text-center">{statTitle}</h1>
          <span
            className="mx-2 flex-end text-white font-bold rounded hover:cursor-pointer"
            onClick={handleExpandClick}
          >
            {expanded ? <IoContractOutline /> : <IoExpandOutline />}
          </span>
        </div>
        <div className={expanded ? "" : ""}>
          <Bar data={data} className="px-12 py-2" />
        </div>
      </div>
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center pt-8 transition-all ease-in duration-100">
          <div className="md:w-[600px] w-full md:min-w-[1000px] bg-white p-4 rounded shadow-md">
            <Bar data={data} />
            <button
              className="w-full mt-8 mx-auto text-red-500 text-sm font-bold py-2 px-4 uppercase text-center"
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
export const PieChartCard: React.FC<StatCardProps> = ({ statTitle }) => {
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
          <h1 className="w-full text-center">{statTitle}</h1>
          <span
            className="mx-2 flex-end text-white font-bold rounded hover:cursor-pointer"
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
          <div className="w-[300px] min-w-[500px] bg-white p-4 rounded shadow-md">
            <Pie data={data} width={10} height={10} />
            <button
              className="w-full mt-8 mx-auto text-red-500 text-sm font-bold py-2 px-4 uppercase text-center"
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
