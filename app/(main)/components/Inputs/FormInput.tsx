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
    <div className={`mb-2 ${className}`}>
      <input
        type={type}
        id={id}
        className="border border-gray-200 text-black rounded px-3 py-1 text-sm w-full"
        placeholder={placeholder}
      />
    </div>
  );
};
