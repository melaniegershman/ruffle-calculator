import React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "0.65rem 1rem",
        background: "#fdf8f5",
        border: "1.5px solid #d4b9a8",
        borderRadius: "6px",
        fontFamily: "'Lora', serif",
        fontSize: "0.9rem",
        color: value ? "#3d2b1f" : "#b09988",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b6f5e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;