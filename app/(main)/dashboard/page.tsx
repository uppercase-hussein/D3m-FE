"use client";
import React from "react";
import {
  BarChartCard,
  PieChartCard,
  StatCard,
} from "../components/Cards/DataCards";
import { FaMoneyCheck } from "react-icons/fa";
import { OutletTableCard } from "../components/Cards/TableCards";

const DashboardPage = () => {
  return (
    <>
      <div className="w-full h-auto bg-scale bg-gray-200 dark:bg-gray-900">
        <div className="pt-80 md:pt-44 pb-12 px-14">
          {/* Header Stat Cards */}
          <div className="w-full overflow-hidden md:overflow-auto flex flex-col md:flex-row justify-between mx-auto">
            <StatCard
              data={1234300}
              statTitle="Total Sales"
              statPercentage={83}
              statDescription={"Annual total sales"}
              icon={<FaMoneyCheck />}
            />
            <StatCard
              data={1234300}
              statTitle="Total Sales"
              statPercentage={83}
              statDescription={"Annual total sales"}
              icon={<FaMoneyCheck />}
            />
            <StatCard
              data={1234300}
              statTitle="Total Sales"
              statPercentage={83}
              statDescription={"Annual total sales"}
              icon={<FaMoneyCheck />}
            />
            <StatCard
              data={1234300}
              statTitle="Total Sales"
              statPercentage={83}
              statDescription={"Annual total sales"}
              icon={<FaMoneyCheck />}
            />
          </div>
          <div className="w-full flex flex-col mx-auto">
            <div className="w-full flex flex-col md:flex-row justify-between mx-auto my-2">
              <OutletTableCard title="All Outlets" />
            </div>
            <div className="w-full flex flex-row justify-between mx-auto my-2">
              <BarChartCard statTitle="Weekly sales" />
            </div>
            <div className="w-full overflow-auto flex flex-col md:flex-row justify-between mx-auto my-2">
              <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff retainment" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
