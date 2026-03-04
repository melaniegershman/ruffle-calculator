import { useState } from "react";
import { MATERIALS, SPI_BASE, FULLNESS_SETTINGS, SCREW_LABELS, RATIO_OPTIONS } from "../constants";
import InputFieldWrapper from "./fields/InputFieldWrapper";
import SelectField from "./fields/SelectField";
import TextField from "./fields/TextField";

const deriveSettingsFromRatio = (ratio) => {
  if (ratio <= 1.75) return { leverSlot: 12, screwTurn: "loose",  fullnessLabel: "Loose",  spiDelta: +1 };
  if (ratio <= 2.5)  return { leverSlot: 6,  screwTurn: "medium", fullnessLabel: "Medium", spiDelta:  0 };
  return { leverSlot: 1,  screwTurn: "tight",  fullnessLabel: "Dense",  spiDelta: -1 };
}




function ToggleGroup({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            flex: 1,
            padding: "0.6rem 0.5rem",
            border: value === opt.value ? "2px solid #8b6f5e" : "1.5px solid #d4b9a8",
            borderRadius: "6px",
            background: value === opt.value ? "#8b6f5e" : "#fdf8f5",
            color: value === opt.value ? "#fdf8f5" : "#6b4f3f",
            fontFamily: "'Lora', serif",
            fontSize: "0.82rem",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "600" }}>{opt.label}</div>
          {opt.sub && <div style={{ fontSize: "0.68rem", opacity: 0.8, marginTop: "2px" }}>{opt.sub}</div>}
        </button>
      ))}
    </div>
  );
}

function ResultCard({ label, value, sub, accent, wide }) {
  return (
    <div style={{
      background: accent ? "#8b6f5e" : "#fdf8f5",
      border: `1.5px solid ${accent ? "#8b6f5e" : "#d4b9a8"}`,
      borderRadius: "10px",
      padding: "1.1rem 1.2rem",
      textAlign: "center",
      gridColumn: wide ? "span 3" : undefined,
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: accent ? "#f0e4da" : "#8b6f5e",
        marginBottom: "0.4rem",
      }}>{label}</div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: wide ? "1.1rem" : "1.5rem",
        fontWeight: "700",
        color: accent ? "#fff" : "#3d2b1f",
        lineHeight: 1.2,
      }}>{value}</div>
      {sub && <div style={{
        fontSize: "0.72rem",
        color: accent ? "#f0e4da" : "#b09988",
        marginTop: "0.3rem",
        fontStyle: "italic",
        lineHeight: 1.4,
      }}>{sub}</div>}
    </div>
  );
}

export default function RuffleCalculator() {
  const [material, setMaterial] = useState("");
  const [baseLength, setBaseLength] = useState("");
  const [ruffleLength, setRuffleLength] = useState("");
  const [ratioMode, setRatioMode] = useState("fullness");
  const [selectedRatio, setSelectedRatio] = useState("");
  const [fullness, setFullness] = useState("");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const base = parseFloat(baseLength);
    const ruffle = parseFloat(ruffleLength);
    if (!material || !base || !ruffle) return;

    const baseSpi = SPI_BASE[material] || 9;
    let ratio, leverSlot, screwTurn, fullnessLabel, spiDelta;

    if (ratioMode === "fullness" && fullness) {
      const f = FULLNESS_SETTINGS[fullness];
      ratio = f.ratio;
      leverSlot = f.leverSlot;
      screwTurn = f.screwTurn;
      fullnessLabel = f.label;
      spiDelta = f.spiDelta;
    } else if (ratioMode === "ratio" && selectedRatio) {
      ratio = parseFloat(selectedRatio);
      const s = deriveSettingsFromRatio(ratio);
      leverSlot = s.leverSlot; screwTurn = s.screwTurn;
      fullnessLabel = s.fullnessLabel; spiDelta = s.spiDelta;
    } else {
      ratio = ruffle / base;
      const s = deriveSettingsFromRatio(ratio);
      leverSlot = s.leverSlot; screwTurn = s.screwTurn;
      fullnessLabel = s.fullnessLabel; spiDelta = s.spiDelta;
    }

    const spiRec = Math.max(6, Math.min(12, baseSpi + spiDelta));
    const neededRuffleLength = base * ratio;
    const actualRatio = ruffle / base;
    const gatherPercent = Math.round((1 - 1 / actualRatio) * 100);
    const matInfo = MATERIALS.find(m => m.value === material);

    setResults({
      ratio: actualRatio.toFixed(2),
      neededRuffleLength: neededRuffleLength.toFixed(2),
      actualRuffleLength: ruffle,
      hasEnough: ruffle >= neededRuffleLength,
      shortage: Math.max(0, neededRuffleLength - ruffle).toFixed(2),
      surplus: Math.max(0, ruffle - neededRuffleLength).toFixed(2),
      leverSlot,
      screwTurn,
      screwLabel: SCREW_LABELS[screwTurn],
      spiRec,
      fullnessLabel,
      gatherPercent,
      stiffness: matInfo?.stiffness,
    });
  };

  const canCalculate = material && baseLength && ruffleLength &&
    (ratioMode === "auto" ||
     (ratioMode === "fullness" && fullness) ||
     (ratioMode === "ratio" && selectedRatio));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5ede6",
      backgroundImage: `radial-gradient(ellipse at 20% 10%, #ede0d8 0%, transparent 50%),
        radial-gradient(ellipse at 80% 90%, #e8d5c8 0%, transparent 50%)`,
      fontFamily: "'Lora', serif",
      padding: "2rem 1rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, select:focus { outline: none; border-color: #8b6f5e !important; box-shadow: 0 0 0 3px rgba(139,111,94,0.12); }
        button:hover { opacity: 0.9; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
      `}</style>

      <div style={{ maxWidth: "520px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b09988", marginBottom: "0.5rem" }}>
            Sewing Tool
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: "700", color: "#3d2b1f", lineHeight: 1.1 }}>
            Ruffle<br /><em style={{ fontWeight: 400 }}>Calculator</em>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "#8b6f5e", margin: "1rem auto 0" }} />
        </div>

        {/* Form Card */}
        <div style={{
          background: "rgba(255,252,249,0.85)",
          backdropFilter: "blur(8px)",
          borderRadius: "16px",
          border: "1px solid #e0cfc6",
          padding: "2rem",
          boxShadow: "0 4px 30px rgba(139,111,94,0.1)",
          marginBottom: "1.5rem",
        }}>
          <InputFieldWrapper label="Fabric Material">
            <SelectField value={material} onChange={setMaterial} placeholder="Select a fabric..." options={MATERIALS} />
          </InputFieldWrapper>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <InputFieldWrapper label="Base Length" hint="The edge you're attaching to">
              <TextField value={baseLength} onChange={setBaseLength} placeholder="21.5" unit="in" />
            </InputFieldWrapper>
            <InputFieldWrapper label="Ruffle Fabric" hint="Length before gathering">
              <TextField value={ruffleLength} onChange={setRuffleLength} placeholder="50" unit="in" />
            </InputFieldWrapper>
          </div>

          <InputFieldWrapper label="Calculation Mode">
            <ToggleGroup
              value={ratioMode}
              onChange={v => { setRatioMode(v); setResults(null); }}
              options={[
                { value: "auto",     label: "Auto",    sub: "from lengths" },
                { value: "fullness", label: "Fullness",sub: "by feel" },
                { value: "ratio",    label: "Ratio",   sub: "precise" },
              ]}
            />
          </InputFieldWrapper>

          {ratioMode === "fullness" && (
            <InputFieldWrapper label="Desired Fullness">
              <ToggleGroup
                value={fullness}
                onChange={setFullness}
                options={[
                  { value: "loose",  label: "Loose",  sub: "1.5×" },
                  { value: "medium", label: "Medium", sub: "2×" },
                  { value: "dense",  label: "Dense",  sub: "3×" },
                ]}
              />
            </InputFieldWrapper>
          )}

          {ratioMode === "ratio" && (
            <InputFieldWrapper label="Ruffle Ratio">
              <SelectField value={selectedRatio} onChange={setSelectedRatio} placeholder="Choose a ratio..." options={RATIO_OPTIONS} />
            </InputFieldWrapper>
          )}

          <button
            onClick={calculate}
            disabled={!canCalculate}
            style={{
              width: "100%",
              padding: "0.9rem",
              background: canCalculate ? "#8b6f5e" : "#d4b9a8",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              letterSpacing: "0.05em",
              cursor: canCalculate ? "pointer" : "not-allowed",
              transition: "background 0.2s",
              marginTop: "0.5rem",
            }}
          >
            Calculate Settings
          </button>
        </div>

        {/* Results */}
        {results && (
          <div style={{
            background: "rgba(255,252,249,0.85)",
            backdropFilter: "blur(8px)",
            borderRadius: "16px",
            border: "1px solid #e0cfc6",
            padding: "2rem",
            boxShadow: "0 4px 30px rgba(139,111,94,0.1)",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              color: "#3d2b1f",
              marginBottom: "1.2rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid #e0cfc6",
            }}>Your Settings</h2>

            {/* Row 1: three core machine settings */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <ResultCard label="Lever Slot" value={results.leverSlot} sub="1 · 6 · or 12" accent />
              <ResultCard label="Stitches / in" value={results.spiRec} sub="on Singer 201" />
              <ResultCard label="Gather Ratio" value={`${results.ratio}×`} sub={results.fullnessLabel} />
            </div>

            {/* Row 2: adjusting screw — full width */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <ResultCard
                label="Adjusting Screw"
                value={results.screwTurn.charAt(0).toUpperCase() + results.screwTurn.slice(1)}
                sub={results.screwLabel}
                wide
              />
            </div>

            {/* Row 3: fabric math */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.2rem" }}>
              <ResultCard label="Fabric Reduced" value={`${results.gatherPercent}%`} sub="consumed by gathering" />
              <ResultCard
                label={results.hasEnough ? "Surplus Fabric" : "Fabric Needed"}
                value={results.hasEnough ? `+${results.surplus}"` : `-${results.shortage}"`}
                sub={results.hasEnough ? "you have extra" : "cut more before starting"}
                accent={!results.hasEnough}
              />
            </div>

            {/* Tips */}
            <div style={{
              background: "#fdf5f0",
              border: "1px solid #e8d5c8",
              borderRadius: "8px",
              padding: "1rem 1.1rem",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#8b6f5e",
                marginBottom: "0.6rem",
              }}>Tips for {MATERIALS.find(m => m.value === material)?.label}</div>
              <ul style={{ paddingLeft: "1.1rem", color: "#6b4f3f", fontSize: "0.82rem", lineHeight: 1.8 }}>
                <li>Test on a 6–8" scrap first — expect ~<strong>{(6 / parseFloat(results.ratio)).toFixed(1)}"</strong> from a 6" strip</li>
                <li><strong>Tighten</strong> the adjusting screw for more fullness; <strong>loosen</strong> for less — use it to fine-tune after your test</li>
                <li><strong>Lower SPI</strong> (longer stitch) adds fullness; <strong>higher SPI</strong> (shorter stitch) reduces it — adjust ±1 from {results.spiRec} as needed</li>
                <li>Pin ruffled piece at both ends + center before sewing the final seam</li>
                {results.stiffness === "light"  && <li>Soft fabric gathers beautifully — good candidate for slot 1 if you want extra volume</li>}
                {results.stiffness === "heavy"  && <li>Crisp/heavy fabric suits pleats over gathers — slots 6 or 12 give cleaner folds</li>}
                {material === "quilting_cotton" && <li>Press the seam allowance only — not the gathers — to preserve loft</li>}
                {material === "chiffon"         && <li>Use a fine needle (65/9) and tissue paper under the foot to prevent skipped stitches</li>}
                {material === "linen"           && <li>Pre-wash to pre-shrink before cutting your ruffle strip</li>}
              </ul>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.7rem", color: "#c4a99a", fontStyle: "italic" }}>
          For use with Singer Ruffling Foot #120598 &amp; Singer 201
        </div>
      </div>
    </div>
  );
}
