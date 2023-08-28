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
      <div className="w-full bg-white text-gray-900 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 bg-red-500 uppercase">
          {statTitle}
        </div>
        <div className="flex flex-col items-end justify-between px-4 mb-4">
          <div className="w-full flex flex-row justify-between align-middle items-center mb-4">
            <div className="text-white p-3 mr-4 rounded-full bg-red-500">
              {icon}
            </div>
            {/* Data */}
            <div className="text-black font-light text-3xl">{data}</div>
          </div>
          <div className="w-full flex flex-row justify-between items-end">
            {/* Percentage */}
            <div className="text-red-500 font-bold text-md pl-2 w-auto border-b border-l border-red-400">
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
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <>
      <div className="w-full bg-white text-gray-900 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 bg-red-500 uppercase">
          {statTitle}
        </div>
        <Bar data={data} />
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
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <>
      <div className="w-full md:w-[30%] bg-white text-gray-900 rounded-md m-2 shadow-md">
        <div className="w-full text-lg text-center text-white font-bold rounded-t-md mb-4 py-2 border-b border-gray-200 bg-red-500 uppercase">
          {statTitle}
        </div>
        <Pie data={data} width={10} height={10} />
      </div>
    </>
  );
};
