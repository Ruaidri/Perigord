import React from "react";
import type { FieldProps } from "./FieldProps";

const CheckboxInput: React.FC<FieldProps> = ({
  name,
  label,
  value,
  onChange,
}) => (
  <div className="flex items-center space-x-3">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={value}
      onChange={onChange}
      className="w-5 h-5 rounded border-gray-600 bg-gray-800 accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <label
      htmlFor={name}
      className="text-white font-semibold select-none"
    >
      {label}
    </label>
  </div>
);

export default CheckboxInput;
