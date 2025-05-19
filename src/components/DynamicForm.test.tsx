import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import DynamicForm from "./DynamicForm";

// dynamic-form-renderer/src/components/DynamicForm.test.tsx

// Mock form field components
vi.mock("./formFields/Input", () => ({
    default: (props: any) => (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                value={props.value || ""}
                onChange={e => props.onChange({ target: { name: props.name, value: e.target.value } })}
                data-testid={`text-input-${props.name}`}
            />
            {props.error && <span data-testid={`error-${props.name}`}>{props.error}</span>}
        </div>
    ),
}));
vi.mock("./formFields/Number", () => ({
    default: (props: any) => (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="number"
                value={props.value || ""}
                onChange={e => props.onChange({ target: { name: props.name, value: e.target.value } })}
                data-testid={`number-input-${props.name}`}
            />
            {props.error && <span data-testid={`error-${props.name}`}>{props.error}</span>}
        </div>
    ),
}));
vi.mock("./formFields/Checkbox", () => ({
    default: (props: any) => (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="checkbox"
                checked={!!props.value}
                onChange={e => props.onChange({ target: { name: props.name, checked: e.target.checked, type: "checkbox" } })}
                data-testid={`checkbox-input-${props.name}`}
            />
            {props.error && <span data-testid={`error-${props.name}`}>{props.error}</span>}
        </div>
    ),
}));
vi.mock("./formFields/Select", () => ({
    default: (props: any) => (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <select
                id={props.name}
                name={props.name}
                value={props.value || ""}
                onChange={e => props.onChange({ target: { name: props.name, value: e.target.value } })}
                data-testid={`select-input-${props.name}`}
            >
                <option value="">Select...</option>
                {props.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {props.error && <span data-testid={`error-${props.name}`}>{props.error}</span>}
        </div>
    ),
}));

// Mock useForm hook
const mockHandleChange = vi.fn();
const mockValidate = vi.fn();
const mockSetErrors = vi.fn();

vi.mock("../hooks/useForm", () => ({
    useForm: () => ({
        formData: mockFormData,
        handleChange: mockHandleChange,
        validate: mockValidate,
        errors: mockErrors,
        setErrors: mockSetErrors,
    }),
}));

let mockFormData: Record<string, any>;
let mockErrors: Record<string, string>;

const schema = {
    title: "Test Form",
    fields: [
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "age", label: "Age", type: "number", required: false },
        { name: "subscribe", label: "Subscribe", type: "checkbox", required: false },
        { name: "color", label: "Favorite Color", type: "select", required: true, options: [
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
        ] },
    ],
};

describe("DynamicForm", () => {
    beforeEach(() => {
        mockFormData = {
            firstName: "",
            age: "",
            subscribe: false,
            color: "",
        };
        mockErrors = {};
        mockHandleChange.mockClear();
        mockValidate.mockClear();
        mockSetErrors.mockClear();
    });

    it("renders all fields and the form title", () => {
        render(<DynamicForm schema={schema as any} />);
        expect(screen.getByText("Test Form")).toBeInTheDocument();
        expect(screen.getByLabelText("First Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Age")).toBeInTheDocument();
        expect(screen.getByLabelText("Subscribe")).toBeInTheDocument();
        expect(screen.getByLabelText("Favorite Color")).toBeInTheDocument();
    });

    it("shows errors when validation fails on submit", () => {
        mockValidate.mockReturnValue({ firstName: "Required" });
        render(<DynamicForm schema={schema as any} />);
        fireEvent.click(screen.getByText("Submit"));
        expect(mockSetErrors).toHaveBeenCalledWith({ firstName: "Required" });
    });

    it("shows submitted data when validation passes", () => {
        mockFormData = {
            firstName: "John",
            age: "30",
            subscribe: true,
            color: "red",
        };
        mockValidate.mockReturnValue({});
        render(<DynamicForm schema={schema as any} />);
        fireEvent.click(screen.getByText("Submit"));
        expect(mockSetErrors).toHaveBeenCalledWith({});
        expect(screen.getByText("Submitted Data")).toBeInTheDocument();
        expect(screen.getByText(/John/)).toBeInTheDocument();
        expect(screen.getByText(/red/)).toBeInTheDocument();
    });

    it("clears submitted data on reset", () => {
        mockFormData = {
            firstName: "John",
            age: "30",
            subscribe: true,
            color: "red",
        };
        mockValidate.mockReturnValue({});
        render(<DynamicForm schema={schema as any} />);
        fireEvent.click(screen.getByText("Submit"));
        expect(screen.getByText("Submitted Data")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Reset"));
        expect(screen.queryByText("Submitted Data")).not.toBeInTheDocument();
    });

    it("calls handleChange when input changes", () => {
        render(<DynamicForm schema={schema as any} />);
        fireEvent.change(screen.getByTestId("text-input-firstName"), { target: { value: "Jane" } });
        expect(mockHandleChange).toHaveBeenCalled();
        fireEvent.change(screen.getByTestId("number-input-age"), { target: { value: "25" } });
        expect(mockHandleChange).toHaveBeenCalled();
        fireEvent.click(screen.getByTestId("checkbox-input-subscribe"));
        expect(mockHandleChange).toHaveBeenCalled();
        fireEvent.change(screen.getByTestId("select-input-color"), { target: { value: "blue" } });
        expect(mockHandleChange).toHaveBeenCalled();
    });
});