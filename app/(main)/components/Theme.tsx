"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

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
    <button
      className="w-full rounded-full flex items-center justify-center transition duration-500 ease-in-out"
      onClick={handleDarkModeToggle}
    >
      {darkMode ? (
        <span className="flex flex-row justify-between items-center text-md">
          <FiSun className="text-gray-900 rounded-full mr-3" />D<sup>3</sup>M
          Light
        </span>
      ) : (
        <span className="flex flex-row justify-between items-center text-md">
          <FiMoon className="text-gray-900 rounded-full mr-3" />D<sup>3</sup>M
          Dark
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;
