export default function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
      <div
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#b09988",
          marginBottom: "0.5rem",
        }}
      >
        Sewing Tool
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.4rem",
          fontWeight: "700",
          color: "#3d2b1f",
          lineHeight: 1.1,
        }}
      >
        Ruffle
        <br />
        <em style={{ fontWeight: 400 }}>Calculator</em>
      </h1>
      <div
        style={{
          width: "40px",
          height: "2px",
          background: "#8b6f5e",
          margin: "1rem auto 0",
        }}
      />
    </div>
  );
}

