import React, { useState, useEffect, useRef } from "react";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";
import { CardQuantityTable, CardTable, TableQuantityItem, TableRowItem } from "../Tables/AllTables";

interface TableCardProps {
  title: string;
  type: string;
  data: TableRowItem[] | TableQuantityItem[]
}

export const OutletTableCard: React.FC<TableCardProps> = ({ title, data, type }) => {
  /* Expand card functionality */
  const [expanded, setExpanded] = useState(false);
  const expandRef = useRef<HTMLDivElement>(null);
  const [itemsToShow, setItemsToShow] = useState(5)
  const [tableData, setTableData] = useState<TableRowItem[]| TableQuantityItem[]>(data.slice(0, 5))

  useEffect(() => {
    if(data) setTableData(data.slice(0, itemsToShow))
  }, [itemsToShow, data])
  

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

  return (
    <div
      className={`w-full flex items-center justify-center ${
        expanded && "min-h-screen"
      } `}
    >
      <div
        className={`${
          expanded ? "bg-black bg-opacity-50 z-50" : ""
        } transition-opacity duration-300 fixed inset-0 pointer-events-none`}
      ></div>
      <div
        className={`w-full ${
          expanded
            ? "h-screen p-4 z-50 bg-white dark:bg-gray-900"
            : "bg-white dark:bg-gray-900"
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
        <div className='flex justify-end'>
        <select className='text-black right select shadow p-3 mx-3' value={itemsToShow} onChange={(e:any)=>setItemsToShow(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        {
          type === "amount" && <CardTable tableRow={tableData} />
        }
        {
          type === "quantity" && <CardQuantityTable tableRow={tableData} />
        }
      </div>
    </div>
  );
};
