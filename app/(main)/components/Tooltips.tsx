"use client";
import React, { ReactNode, useState, useRef } from "react";

interface TooltipProps {
  icon: ReactNode;
  text: string;
  link?: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ icon, text, link, className }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleIconMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowTooltip(true);
  };

  const handleIconMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
    }, 350);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="w-auto p-2 my-1 mx-2">
      <div
        className={`${className}`}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
      >
        {showTooltip && (
          <div
            className="absolute left-full top-1 bg-black/70 text-white px-4 py-2 text-xs rounded-md w-40"
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            {text}
            {link && (
              <a href={link} className="block text-blue-300 mt-2">
                click here
              </a>
            )}
          </div>
        )}
        {icon}
      </div>
    </div>
  );
};

export default Tooltip;
