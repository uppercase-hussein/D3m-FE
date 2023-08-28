"use client";
import React from "react";
import { BarChartCard, PieChartCard, StatCard } from "../components/Cards/DataCard";
import { FaMoneyCheck } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <>
      <div className="w-full h-auto bg-scale bg-gray-300">
        <div className="pt-4 pb-12 px-14">
          {/* Header Stat Cards */}
          <div className="w-full flex flex-col md:flex-row justify-between mx-auto">
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
            <div className="w-full flex flex-row justify-between mx-auto my-2">
              <BarChartCard statTitle="Weekly sales" />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between mx-auto my-2">
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
