import { MATERIALS } from "../../constants.ts";

type ResultCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  wide?: boolean;
};

function ResultCard({ label, value, sub, accent, wide }: ResultCardProps) {
  return (
    <div
      style={{
        background: accent ? "#8b6f5e" : "#fdf8f5",
        border: `1.5px solid ${accent ? "#8b6f5e" : "#d4b9a8"}`,
        borderRadius: "10px",
        padding: "1.1rem 1.2rem",
        textAlign: "center",
        gridColumn: wide ? "span 3" : undefined,
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent ? "#f0e4da" : "#8b6f5e",
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: wide ? "1.1rem" : "1.5rem",
          fontWeight: "700",
          color: accent ? "#fff" : "#3d2b1f",
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: "0.72rem",
            color: accent ? "#f0e4da" : "#b09988",
            marginTop: "0.3rem",
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

type ResultsProps = {
  results: any;
  material: string;
};

export default function Results({ results, material }: ResultsProps) {
  if (!results) return null;

  const materialLabel = MATERIALS.find((m) => m.value === material)?.label;

  return (
    <div
      style={{
        background: "rgba(255,252,249,0.85)",
        backdropFilter: "blur(8px)",
        borderRadius: "16px",
        border: "1px solid #e0cfc6",
        padding: "2rem",
        boxShadow: "0 4px 30px rgba(139,111,94,0.1)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          color: "#3d2b1f",
          marginBottom: "1.2rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid #e0cfc6",
        }}
      >
        Your Settings
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <ResultCard
          label="Lever Slot"
          value={results.leverSlot}
          sub="1 · 6 · or 12"
          accent
        />
        <ResultCard
          label="Stitches / in"
          value={results.spiRec}
          sub="on Singer 201"
        />
        <ResultCard
          label="Gather Ratio"
          value={`${results.ratio}×`}
          sub={results.fullnessLabel}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <ResultCard
          label="Adjusting Screw"
          value={
            results.screwTurn.charAt(0).toUpperCase() +
            results.screwTurn.slice(1)
          }
          sub={results.screwLabel}
          wide
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.2rem",
        }}
      >
        <ResultCard
          label="Fabric Reduced"
          value={`${results.gatherPercent}%`}
          sub="consumed by gathering"
        />
        <ResultCard
          label={results.hasEnough ? "Surplus Fabric" : "Fabric Needed"}
          value={
            results.hasEnough
              ? `+${results.surplus}"`
              : `-${results.shortage}"`
          }
          sub={
            results.hasEnough ? "you have extra" : "cut more before starting"
          }
          accent={!results.hasEnough}
        />
      </div>

      <div
        style={{
          background: "#fdf5f0",
          border: "1px solid #e8d5c8",
          borderRadius: "8px",
          padding: "1rem 1.1rem",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8b6f5e",
            marginBottom: "0.6rem",
          }}
        >
          Tips for {materialLabel}
        </div>
        <ul
          style={{
            paddingLeft: "1.1rem",
            color: "#6b4f3f",
            fontSize: "0.82rem",
            lineHeight: 1.8,
          }}
        >
          <li>
            Test on a 6–8" scrap first — expect ~
            <strong>
              {(6 / parseFloat(results.ratio)).toFixed(1)}
              "
            </strong>{" "}
            from a 6" strip
          </li>
          <li>
            <strong>Tighten</strong> the adjusting screw for more fullness;{" "}
            <strong>loosen</strong> for less — use it to fine-tune after your
            test
          </li>
          <li>
            <strong>Lower SPI</strong> (longer stitch) adds fullness;{" "}
            <strong>higher SPI</strong> (shorter stitch) reduces it — adjust ±1
            from {results.spiRec} as needed
          </li>
          <li>
            Pin ruffled piece at both ends + center before sewing the final seam
          </li>
          {results.stiffness === "light" && (
            <li>
              Soft fabric gathers beautifully — good candidate for slot 1 if you
              want extra volume
            </li>
          )}
          {results.stiffness === "heavy" && (
            <li>
              Crisp/heavy fabric suits pleats over gathers — slots 6 or 12 give
              cleaner folds
            </li>
          )}
          {material === "quilting_cotton" && (
            <li>
              Press the seam allowance only — not the gathers — to preserve loft
            </li>
          )}
          {material === "chiffon" && (
            <li>
              Use a fine needle (65/9) and tissue paper under the foot to
              prevent skipped stitches
            </li>
          )}
          {material === "linen" && (
            <li>Pre-wash to pre-shrink before cutting your ruffle strip</li>
          )}
        </ul>
      </div>
    </div>
  );
}

