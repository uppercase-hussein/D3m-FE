"use client";
import { FaFileExcel, FaQuestionCircle, FaUser } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "../Theme";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ViewOutletDetailsModal } from "../Buttons/ModalButton";

// User Dropdown
export const UserDropdown = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* Dropdown Toggle stuff */
  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  /* Handle options */
  const handleOptionClick = (option: any) => {
    console.log(`Option clicked: ${option}`);
    setIsDropdownOpen(false);
  };

  /* Dark mode stuff */
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="relative">
      <div
        className="rounded-full w-auto p-5 bg-gray-300 border-b border-gray-600 cursor-pointer hover:scale-105 transition-all duration-150 ease-in"
        onClick={toggleDropdown}
      >
        <FaUser className="text-gray-600 text-center mx-auto" />
      </div>
      {isDropdownOpen && (
        <div className="absolute w-[200px] z-50 top-full right-0 mt-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          {/* Dropdown content */}
          <div className="pt-4 pb-6 px-2 rounded-t-md bg-gray-100 dark:bg-gray-800">
            <h1 className="text-center font-semibold rounded-t-md dark:text-white">
              Welcome, User
            </h1>
            <p className="text-center text-xs text-gray-500 dark:text-white/60">
              {formattedDate}
            </p>
          </div>
          <ul className="w-full text-gray-900 dark:text-white">
            <li
              onClick={() => closeDropdown()}
              className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 hover:bg-gray-300 transition-all ease-in duration-150"
            >
              <FaFileExcel className="w-4 mr-2" />
              <span className="w-full text-left">Export All Data</span>
            </li>
            <li
              onClick={() => closeDropdown()}
              className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 hover:bg-gray-300 transition-all ease-in duration-150"
            >
              <FaQuestionCircle className="w-4 mr-2" />
              <span className="w-full text-left">Query Staff/Outlet</span>
            </li>
            <li className="flex flex-row items-center justify-between text-sm py-2 px-4 cursor-pointer border-b dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 hover:bg-gray-300 transition-all ease-in duration-150">
              <span className="w-full">
                <DarkModeToggle
                  darkMode={darkMode}
                  handleToggle={handleDarkModeToggle}
                  additionalFunction={closeDropdown}
                />
              </span>
            </li>
            <li
              onClick={() => handleOptionClick("Sign Out")}
              className="mt-1 py-3 px-4 text-center text-red-500 dark:text-red-400 text-sm cursor-pointer transition-all ease-in duration-150"
            >
              <span className="hover:border-b border-red-500 dark:border-red-400">
                Sign out
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Table Options Dropdown
export const TableOptionsDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Dropdown Toggle stuff */
  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <BiDotsVerticalRounded />
      </div>
      {isDropdownOpen && (
        <div className="absolute w-[200px] z-50 top-full right-0 mt-1 bg-white dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
          {/* Dropdown content */}
          <div className="w-full">
            <ViewOutletDetailsModal
              outletName="Branch name"
              modalTitle="Uploads for"
              modalInstruction="View all days where outlet has uploaded for the month"
              modalCTA="Review"
            />
          </div>
        </div>
      )}
    </div>
  );
};
