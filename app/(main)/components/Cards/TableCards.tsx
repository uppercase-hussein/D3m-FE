import React, { useState, useEffect, useRef } from "react";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";
import { CardTable } from "../Tables/AllTables";
import { dummyData } from "@/app/interface/DummyData";

interface TableCardProps {
  title: string;
}

export const OutletTableCard: React.FC<TableCardProps> = ({ title }) => {
  /* Expand card functionality */
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleExpandClick = (event: MouseEvent) => {
      if (
        expandRef.current &&
        !expandRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    window.addEventListener("click", handleExpandClick);
    return () => {
      window.removeEventListener("click", handleExpandClick);
    };
  }, []);

  /* Data stuff */
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
    <div
      className={`w-full flex items-center justify-center ${
        expanded && "min-h-screen"
      } `}
    >
      <div
        className={`${
          expanded ? "bg-black bg-opacity-50" : ""
        } transition-opacity duration-300 fixed inset-0 pointer-events-none`}
      ></div>
      <div
        className={`w-full ${
          expanded ? "h-screen p-4" : "bg-white dark:bg-gray-900"
        } text-gray-900 rounded-md shadow-md overflow-hidden transition-all duration-300`}
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
        <CardTable tableRow={dummyData} />
      </div>
    </div>
  );
};
