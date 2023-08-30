import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface DarkModeToggleProps {
  darkMode: boolean;
  handleDarkModeToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  handleDarkModeToggle,
}) => {
  return (
    <button
      className="w-full rounded-full flex items-center justify-center transition duration-500 ease-in-out"
      onClick={handleDarkModeToggle}
    >
      {darkMode ? (
        <span className="flex flex-row justify-between items-center text-md">
          <FiSun className="text-gray-900 dark:text-yellow-500 rounded-full mr-3" />D<sup>3</sup>M
          Light
        </span>
      ) : (
        <span className="flex flex-row justify-between items-center text-md">
          <FiMoon className="text-gray-900 dark:text-white rounded-full mr-3" />D<sup>3</sup>M
          Dark
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;
