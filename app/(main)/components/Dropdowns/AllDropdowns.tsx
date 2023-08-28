"use client";
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";

export const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: any) => {
    console.log(`Option clicked: ${option}`);
  };

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
          <ul className="w-full">
            <li
              onClick={() => handleOptionClick("Export All Data")}
              className="py-2 px-4 cursor-pointer border-b border-gray-300 hover:bg-red-200 transition-all ease-in duration-150 rounded-t-md"
            >
              Export All Data
            </li>
            <li
              onClick={() => handleOptionClick("Query Staff/Outlet")}
              className="py-2 px-4 cursor-pointer border-b border-gray-300 hover:bg-red-200 transition-all ease-in duration-150"
            >
              Query Staff/Outlet
            </li>
            <li
              onClick={() => handleOptionClick("Sign Out")}
              className="py-2 px-4 cursor-pointer hover:bg-red-200 transition-all ease-in duration-150 rounded-b-md"
            >
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
