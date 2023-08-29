"use client";
import { FaFileExcel, FaQuestionCircle, FaUser } from "react-icons/fa";
import React, { useState } from "react";
import DarkModeToggle from "../Theme";

export const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: any) => {
    console.log(`Option clicked: ${option}`);
    // setIsDropdownOpen(false);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative">
      <div
        className="rounded-full w-auto p-5 bg-gray-300 border-b border-gray-600 cursor-pointer hover:scale-105 transition-all duration-150 ease-in"
        onClick={toggleDropdown}
      >
        <FaUser className="text-gray-600 text-center mx-auto" />
      </div>
      {isDropdownOpen && (
        <div className="absolute w-[200px] z-50 top-full right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Dropdown content */}
          <div className="pt-4 pb-6 rounded-t-md bg-gray-100">
            <h1 className="text-center font-semibold  rounded-t-md">
              Welcome, User
            </h1>
            <p className="text-center text-sm text-gray-500">{formattedDate}</p>
          </div>
          <ul className="w-full">
            <li
              onClick={() => handleOptionClick("Export All Data")}
              className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b border-gray-300 hover:bg-gray-300 transition-all ease-in duration-150"
            >
              <FaFileExcel className="w-4 mr-2" />
              <span className="w-full text-left">Export All Data</span>
            </li>
            <li
              onClick={() => handleOptionClick("Query Staff/Outlet")}
              className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b border-gray-300 hover:bg-gray-300 transition-all ease-in duration-150"
            >
              <FaQuestionCircle className="w-4 mr-2" />
              <span className="w-full text-left">Query Staff/Outlet</span>
            </li>
            <li
              onClick={() => handleOptionClick("Dark mode toggle")}
              className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b border-gray-300 hover:bg-gray-300 transition-all ease-in duration-150"
            >
              <span className="w-full">
                <DarkModeToggle />
              </span>
            </li>
            <li
              onClick={() => handleOptionClick("Sign Out")}
              className="mt-1 py-3 px-4 text-center text-red-500 text-sm cursor-pointer transition-all ease-in duration-150"
            >
              <span className="hover:border-b border-red-500"> Sign out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
