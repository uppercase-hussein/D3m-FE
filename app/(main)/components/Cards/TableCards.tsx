import React from "react";
import { CardTable } from "../Tables/AllTables";
import { dummyData } from "@/app/interface/DummyData";

interface TableCardProps {
  title: string;
}

export const OutletTableCard: React.FC<TableCardProps> = ({ title }) => {
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
          {title}
        </div>
        <CardTable tableRow={dummyData} />
      </div>
    </>
  );
};
