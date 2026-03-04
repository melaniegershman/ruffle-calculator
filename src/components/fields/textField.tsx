const InputField = ({ label, hint, children }: { label: string, hint: string, children: React.ReactNode }) => {
    return (
        <div style={{ marginBottom: "1.6rem" }}>
            <label style={{
                display: "block",
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8b6f5e",
                marginBottom: "0.4rem",
            }}>{label}</label>
            {children}
            {hint && <p style={{ fontSize: "0.72rem", color: "#b09988", marginTop: "0.3rem", fontStyle: "italic" }}>{hint}</p>}
        </div>
    )
}

export default InputField;