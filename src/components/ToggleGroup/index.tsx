import type { ToggleGroupProps } from "./types";
import styles from "./ToggleGroup.module.css";

const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, onChange }) => (
  <div className={styles.group}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={value === opt.value ? `${styles.button} ${styles.buttonActive}` : styles.button}
      >
        <div className={styles.label}>{opt.label}</div>
        {opt.sub != null && <div className={styles.sub}>{opt.sub}</div>}
      </button>
    ))}
  </div>
);

export default ToggleGroup;
