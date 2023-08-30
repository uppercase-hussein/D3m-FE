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
      className="w-full py-2 rounded-full flex items-center justify-center transition duration-500 ease-in-out"
      onClick={handleDarkModeToggle}
    >
      {darkMode ? (
        <span className="w-full flex flex-row justify-between items-center text-md">
          <FiSun className="w-4 text-gray-900 dark:text-yellow-500 rounded-full mr-2" />
          <span className="w-full text-left">
            D<sup>3</sup>M Light
          </span>
        </span>
      ) : (
        <span className="w-full flex flex-row justify-between items-center text-md">
          <FiMoon className="w-4 text-gray-900 dark:text-white rounded-full mr-2" />
          <span className="w-full text-left">
            D<sup>3</sup>M Dark
          </span>
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;
