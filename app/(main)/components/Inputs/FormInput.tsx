import React from "react";

interface FormInputProps {
  type: string;
  id: string;
  className?: string;
  placeholder: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  id,
  className,
  placeholder,
}) => {
  return (
    <div className={`w-full mb-2 ${className}`}>
      <input
        type={type}
        id={id}
        className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-black dark:text-gray-100 rounded px-3 py-1 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};
