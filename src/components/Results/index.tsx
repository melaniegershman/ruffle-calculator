import { MATERIALS } from "../../constants.ts";
import ResultCard from "./ResultCard";
import styles from "./Results.module.css";

type ResultsProps = {
  results: any;
  material: string;
};

const Results = ({ results, material }: ResultsProps) => {
  if (!results) return null;

  const materialLabel = MATERIALS.find((m) => m.value === material)?.label;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Settings</h2>

      <div className={styles.grid}>
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

      <div className={styles.grid}>
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

      <div className={`${styles.grid} ${styles.grid_twoCol}`}>
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

      <div className={styles.tips}>
        <div className={styles.tipsTitle}>Tips for {materialLabel}</div>
        <ul className={styles.tipsList}>
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
          <li>Rembember to disengage the adjusting finger for gathers, and to engage it for pleats.</li>
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
};

export default Results;

