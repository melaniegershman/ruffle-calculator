import React from "react";
import styles from "./SelectField.module.css";

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

export const SelectField: React.FC<SelectFieldProps> = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={[styles.select, !value && styles.placeholder].filter(Boolean).join(" ")}
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