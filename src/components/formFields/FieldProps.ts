import type { ChangeEvent } from "react";

export interface FieldProps {
  name: string;
  label: string;
  value: any;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
}
