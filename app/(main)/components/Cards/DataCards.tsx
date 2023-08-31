"use client";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import React, { useEffect } from "react";
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
      <div className="w-full bg-white dark:bg-gray-200 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-300 bg-red-500 dark:bg-gray-800 uppercase">
          {statTitle}
        </div>
        <div className="px-12 pt-2 pb-4">
          <Bar data={data} />
        </div>
      </div>
    </>
  );
};

/* 
Pie chart Card Component 
*/
export const PieChartCard: React.FC<StatCardProps> = ({ statTitle }) => {
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
      <div className="w-full md:w-2/3 bg-white dark:bg-gray-200 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 dark:border-gray-300 bg-red-500 dark:bg-gray-800 uppercase">
          {statTitle}
        </div>
        <div className="px-12 pt-2 pb-4">
          <Pie data={data} width={10} height={10} />
        </div>
      </div>
    </>
  );
};
