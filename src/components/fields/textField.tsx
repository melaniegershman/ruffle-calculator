  type TextFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    unit?: string;
  };
  

const TextField: React.FC<TextFieldProps> = ({ value, onChange, placeholder, unit }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <input
      type="number"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      min="0"
      step="0.25"
      style={{
        width: "100%",
        padding: "0.65rem 2.8rem 0.65rem 1rem",
        background: "#fdf8f5",
        border: "1.5px solid #d4b9a8",
        borderRadius: "6px",
        fontFamily: "'Lora', serif",
        fontSize: "0.9rem",
        color: "#3d2b1f",
        boxSizing: "border-box",
      }}
    />
    {unit && (
      <span
        style={{
          position: "absolute",
          right: "1rem",
          fontSize: "0.75rem",
          color: "#b09988",
          fontStyle: "italic",
          pointerEvents: "none",
        }}
      >
        {unit}
      </span>
    )}
  </div>
);

export default TextField;