import React from "react";
import styles from "./TextField.module.css";

type TextFieldProps = {
  value: number;
  onChange: (value: number) => void;
  placeholder?: number;
  unit?: string;
};

export const TextField: React.FC<TextFieldProps> = ({ value, onChange, placeholder, unit }) => (
  <div className={styles.wrapper}>
    <input
      type="number"
      value={value === 0 ? "" : String(value)}
      onChange={e => {
        const raw = e.target.value;
        const num = raw === "" ? 0 : Number(raw);
        onChange(Number.isFinite(num) ? num : 0);
      }}
      placeholder={placeholder !== undefined ? String(placeholder) : undefined}
      min="0"
      step="0.25"
      className={styles.input}
    />
    {unit && (
      <span className={styles.unit}>
        {unit}
      </span>
    )}
  </div>
);
