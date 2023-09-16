"use client";
import Select from "react-select";
import React, { useState, useEffect } from "react";

interface DropdownInputProps {
  title?: string;
  label?: string;
  select: string;
  selectable?: boolean;
  options?: any; //{ value: string; label: string }[];
  onChange: (value: string) => void;
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  select,
  options,
  title,
  label,
  selectable = false,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(select);
  const handleOptionChange = (selected: any) => {
    if (selected && selected.value) {
      const { value } = selected;
      setSelectedOption(value);
      onChange(value);
    } else {
      const { value } = selected.target;
      setSelectedOption(value);
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      <label
        className="block mb-1 font-bold text-sm text-gray-700"
        htmlFor="dropdown"
      >
        {label}
      </label>
      <div>
        {selectable && (
          <Select
            styles={{
              menuList: (baseStyles, state) => ({
                ...baseStyles,
                height: "7rem",
                zIndex: 70,
              }),
            }}
            placeholder={label}
            defaultValue={selectedOption}
            onChange={handleOptionChange}
            options={options}
            className="font-light text-sm mt-1 block w-[90%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        )}
        {!selectable && (
          <select
            value={selectedOption as string}
            onChange={handleOptionChange}
            className="font-light text-sm mt-1 block w-[90%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="" disabled>
              {label}
            </option>
            {options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
