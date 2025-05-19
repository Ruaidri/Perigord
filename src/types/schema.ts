export type FieldType = "text" | "number" | "checkbox" | "select";

export interface Field {
  label: string;
  type: FieldType;
  name: string;
  required?: boolean;
  options?: string[];
}

export interface Schema {
  title: string;
  fields: Field[];
}

export interface DynamicFormProps {
  schema: Schema;
}
