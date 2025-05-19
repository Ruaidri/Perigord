import React from "react";
import type { FieldProps } from "./FieldProps";

const TextInput: React.FC<FieldProps> = ({
  name,
  label,
  value,
  required,
  onChange,
  error,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-1 text-sm font-semibold text-white"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      className={`bg-gray-800 text-white placeholder-gray-400 border rounded-md px-3 py-2 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition-colors duration-300
        ${error ? "border-red-500" : "border-gray-700"}
      `}
      placeholder={`Enter ${label.toLowerCase()}`}
      autoComplete="off"
    />
    {error && (
      <span className="text-red-500 text-sm mt-1">{error}</span>
    )}
  </div>
);

export default TextInput;
