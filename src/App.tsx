import React from "react";
import DynamicForm from "./components/DynamicForm";
import type { Schema } from "./types/schema";

const schema: Schema = {
  title: "User Registration",
  fields: [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Age", type: "number", name: "age" },
    { label: "Subscribe", type: "checkbox", name: "subscribe" },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      options: ["Male", "Female", "Other"],
    },
  ],
};

const App: React.FC = () => {
  return <DynamicForm schema={schema} />;
};

export default App;
