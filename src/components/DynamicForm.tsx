import React, { useState, type FormEvent } from "react";
import TextInput from "./formFields/Input";
import NumberInput from "./formFields/Number";
import CheckboxInput from "./formFields/Checkbox";
import SelectInput from "./formFields/Select";
import type { Schema } from "../types/schema";
import { useForm } from "../hooks/useForm";

interface DynamicFormProps {
  schema: Schema;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const {
    formData,
    handleChange,
    validate,
    errors,
    setErrors,
  } = useForm(schema);

  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 animate-fade-in">
      <div className="p-8 max-w-2xl w-full bg-gray-900 bg-opacity-90 shadow-2xl rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2 text-center">
          {schema.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {schema.fields.map((field) => {
            const commonProps = {
              name: field.name,
              label: field.label,
              value: formData[field.name],
              required: field.required,
              onChange: handleChange,
              error: errors[field.name],
              inputClassName:
                "bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300",
              labelClassName: "text-white font-semibold",
              errorClassName: "text-red-400 mt-1 text-sm",
            };

            switch (field.type) {
              case "text":
                return <TextInput key={field.name} {...commonProps} />;
              case "number":
                return <NumberInput key={field.name} {...commonProps} />;
              case "checkbox":
                // For checkbox, label styling will be different
                return <CheckboxInput key={field.name} {...commonProps} />;
              case "select":
                return (
                  <SelectInput
                    key={field.name}
                    {...commonProps}
                    options={field.options ?? []}
                  />
                );
              default:
                return null;
            }
          })}

          <div className="flex gap-3 justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-6 rounded-lg transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => {
                setSubmittedData(null);
                setErrors({});
              }}
            >
              Reset
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="mt-8 bg-gray-800 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto border border-gray-700">
            <h3 className="text-lg font-semibold mb-2 text-white text-center">
              Submitted Data
            </h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
