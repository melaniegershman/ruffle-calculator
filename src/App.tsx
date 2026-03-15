import { useState } from 'react'
import { MATERIALS, SPI_BASE, FULLNESS_SETTINGS, SCREW_LABELS } from "./constants.ts";
import Header from "./components/Header/index.tsx";
import FormCard from "./components/FormCard/index.tsx";
import Results from "./components/Results/index.tsx";
import './App.css'

type ResultsState = {
  ratio: string;
  neededRuffleLength: string;
  actualRuffleLength: number;
  hasEnough: boolean;
  shortage: string;
  surplus: string;
  leverSlot: number;
  screwTurn: string;
  screwLabel: string;
  spiRec: number;
  fullnessLabel: string;
  gatherPercent: number;
  stiffness?: string;
} | null;

const deriveSettingsFromRatio = (ratio: number) => {
  if (ratio <= 1.25) return { leverSlot: 12, screwTurn: "loose",  fullnessLabel: "Loose",  spiDelta: +1 };
  if (ratio <= 1.75)  return { leverSlot: 6,  screwTurn: "medium", fullnessLabel: "Medium", spiDelta:  0 };
  return { leverSlot: 1,  screwTurn: "tight",  fullnessLabel: "Dense",  spiDelta: -1 };
}

function App() {
  const [material, setMaterial] = useState("");
  const [baseLength, setBaseLength] = useState(0);
  const [ruffleLength, setRuffleLength] = useState(0);
  const [ratioMode, setRatioMode] = useState("fullness");
  const [selectedRatio, setSelectedRatio] = useState(1.5);
  const [fullness, setFullness] = useState("");
  const [results, setResults] = useState<ResultsState>(null);

  const calculate = () => {
    const base = baseLength;
    const ruffle = ruffleLength;
    if (!material || !base || !ruffle) return;

    const baseSpi = SPI_BASE[material as keyof typeof SPI_BASE] || 9;
    let ratio, leverSlot, screwTurn, fullnessLabel, spiDelta;

    if (ratioMode === "fullness" && fullness) {
      const f = FULLNESS_SETTINGS[fullness as keyof typeof FULLNESS_SETTINGS];
      ratio = f.ratio;
      leverSlot = f.leverSlot;
      screwTurn = f.screwTurn;
      fullnessLabel = f.label;
      spiDelta = f.spiDelta;
    } else if (ratioMode === "ratio" && selectedRatio) {
      ratio = selectedRatio;
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
    const matInfo = MATERIALS.find((m: any) => m.value === material);

    setResults({
      ratio: actualRatio.toFixed(2),
      neededRuffleLength: neededRuffleLength.toFixed(2),
      actualRuffleLength: ruffle,
      hasEnough: ruffle >= neededRuffleLength,
      shortage: Math.max(0, neededRuffleLength - ruffle).toFixed(2),
      surplus: Math.max(0, ruffle - neededRuffleLength).toFixed(2),
      leverSlot,
      screwTurn,
      screwLabel: SCREW_LABELS[screwTurn as keyof typeof SCREW_LABELS],
      spiRec,
      fullnessLabel,
      gatherPercent,
      stiffness: matInfo?.stiffness,
    });
  };

  const handleRatioModeChange = (v: string) => {
    setRatioMode(v);
    setResults(null);
  };

  const canCalculate: boolean = !!(material && baseLength && ruffleLength &&
    (ratioMode === "auto" ||
     (ratioMode === "fullness" && fullness) ||
     (ratioMode === "ratio" && selectedRatio)));

  return (
    <div className="appRoot">
      <div className="appContainer">
        <Header />

        <FormCard
          material={material}
          setMaterial={setMaterial}
          baseLength={baseLength}
          setBaseLength={setBaseLength}
          ruffleLength={ruffleLength}
          setRuffleLength={setRuffleLength}
          ratioMode={ratioMode}
          onRatioModeChange={handleRatioModeChange}
          fullness={fullness}
          setFullness={setFullness}
          selectedRatio={selectedRatio}
          setSelectedRatio={setSelectedRatio}
          canCalculate={canCalculate}
          onCalculate={calculate}
        />

        {results && (
          <Results results={results} material={material} />
        )}

        <div className="appFooter">
          For use with Singer Ruffling Foot #120598 &amp; Singer 201
        </div>
      </div>
    </div>
  );
}

export default App
