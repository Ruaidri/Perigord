import { useState } from "react";
import type { Schema } from "../types/schema";

export const useForm = (schema: Schema) => {
  
  const initialState = schema.fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const validate = (): Record<string, string> => {
  const newErrors: Record<string, string> = {};
  const nameRegex = /^[A-Za-z\s]+$/;

  schema.fields.forEach((field) => {
    const value = formData[field.name];

    if (field.required && (value === "" || value === null || value === undefined)) {
      newErrors[field.name] = `${field.label} is required`;
      return;
    }

    if (field.name.toLowerCase().includes("name")) {
      if (typeof value === "string" && !nameRegex.test(value)) {
        newErrors[field.name] = `${field.label} should contain only letters and spaces`;
      }
    }

    if (field.name.toLowerCase() === "age" || field.name.toLowerCase().includes("age")) {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0 || numValue > 105) {
        newErrors[field.name] = `${field.label} must be a number between 0 and 105`;
      }
    }

    if (typeof value === "string" && /<script.*?>.*?<\/script>/gi.test(value)) {
      newErrors[field.name] = `Invalid input detected in ${field.label}`;
    }
  });

  return newErrors;
};


  return { formData, handleChange, validate, errors, setErrors, setFormData };
};
