"use client";
import React from "react";
import {
  BarChartCard,
  PieChartCard,
  StatCard,
} from "../components/Cards/DataCards";
import { FaMoneyCheck, FaNairaSign } from "react-icons/fa6";
import { OutletTableCard } from "../components/Cards/TableCards";
import ChatAi from "../components/ChatAi";

const DashboardPage = () => {
  return (
    <>
      <div className="w-full h-auto bg-scale bg-gray-200 dark:bg-gray-900">
        <div className="pt-80 md:pt-44 pb-12 px-14">
          {/* Header Stat Cards */}
          <div className="w-full overflow-auto flex flex-row justify-between">
            <StatCard
              data={`₦1234300`}
              statTitle="Total Sales"
              statPercentage={83}
              statDescription={"Total sales for this month"}
              icon={<FaNairaSign className="text-green-400 dark:text-green-500" />}
            />
            <StatCard
              data={`₦1234300`}
              statTitle="Revenue Growth"
              statPercentage={83}
              statDescription={"Monthly gains"}
              icon={<FaNairaSign className="text-green-400 dark:text-green-500" />}
            />
            <StatCard
              data={`₦1234300`}
              statTitle="Monthly Expenses"
              statPercentage={83}
              statDescription={"Monthly expenditure"}
              icon={<FaNairaSign className="text-green-400 dark:text-green-500" />}
            />
            <StatCard
              data={`₦1234300`}
              statTitle="Inventory turnover"
              statPercentage={83}
              statDescription={"Rate of inventory sale/restock"}
              icon={<FaNairaSign className="text-green-400 dark:text-green-500" />}
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col md:flex-row justify-between my-2">
              <OutletTableCard title="All Outlets" />
            </div>
            <div className="w-full flex flex-row justify-between mx-auto my-2">
              <BarChartCard statTitle="Weekly sales" />
            </div>
            <div className="w-full overflow-auto flex flex-row justify-between mx-auto my-2">
              <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff retainment" />
            </div>
            <ChatAi/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
