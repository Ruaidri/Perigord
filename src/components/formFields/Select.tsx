import React from "react";
import type { FieldProps } from "./FieldProps";

interface SelectProps extends FieldProps {
  options: string[];
}

const SelectInput: React.FC<SelectProps> = ({
  name,
  label,
  value,
  required,
  onChange,
  error,
  options,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-1 text-sm font-semibold text-white"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`bg-gray-800 text-white border rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition-colors duration-300
        ${error ? "border-red-500" : "border-gray-700"}
      `}
    >
      <option value="" disabled>
        -- Select --
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && (
      <span className="text-red-500 text-sm mt-1">{error}</span>
    )}
  </div>
);

export default SelectInput;
