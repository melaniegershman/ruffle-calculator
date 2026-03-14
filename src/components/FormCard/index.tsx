import { MATERIALS } from "../../constants";
import { InputFieldWrapper } from "../fields/InputFieldWrapper";
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import ToggleGroup from "../ToggleGroup";
import {
  FULLNESS_OPTIONS,
  RATIO_MODE_OPTIONS,
  RATIO_SELECT_OPTIONS,
} from "./formCardOptions";
import styles from "./FormCard.module.css";

export type FormCardProps = {
  material: string;
  setMaterial: (value: string) => void;
  baseLength: number;
  setBaseLength: (value: number) => void;
  ruffleLength: number;
  setRuffleLength: (value: number) => void;
  ratioMode: string;
  onRatioModeChange: (value: string) => void;
  fullness: string;
  setFullness: (value: string) => void;
  selectedRatio: number;
  setSelectedRatio: (value: number) => void;
  canCalculate: boolean;
  onCalculate: () => void;
};

const FormCard: React.FC<FormCardProps> = ({
  material,
  setMaterial,
  baseLength,
  setBaseLength,
  ruffleLength,
  setRuffleLength,
  ratioMode,
  onRatioModeChange,
  fullness,
  setFullness,
  selectedRatio,
  setSelectedRatio,
  canCalculate,
  onCalculate,
}) => (
  <div className={styles.card}>
    <InputFieldWrapper label="Fabric Material">
      <SelectField
        value={material}
        onChange={setMaterial}
        placeholder="Select a fabric..."
        options={MATERIALS}
      />
    </InputFieldWrapper>

    <div className={styles.grid}>
      <InputFieldWrapper label="Base Length" hint="The edge you're attaching to">
        <TextField
          value={baseLength}
          onChange={setBaseLength}
          placeholder={21.5}
          unit="in"
        />
      </InputFieldWrapper>
      <InputFieldWrapper label="Ruffle Fabric" hint="Length before gathering">
        <TextField
          value={ruffleLength}
          onChange={setRuffleLength}
          placeholder={50}
          unit="in"
        />
      </InputFieldWrapper>
    </div>

    <InputFieldWrapper label="Calculation Mode">
      <ToggleGroup
        value={ratioMode}
        onChange={onRatioModeChange}
        options={RATIO_MODE_OPTIONS}
      />
    </InputFieldWrapper>

    {ratioMode === "fullness" && (
      <InputFieldWrapper label="Desired Fullness">
        <ToggleGroup value={fullness} onChange={setFullness} options={FULLNESS_OPTIONS} />
      </InputFieldWrapper>
    )}

    {ratioMode === "ratio" && (
      <InputFieldWrapper label="Ruffle Ratio">
        <SelectField
          value={String(selectedRatio)}
          onChange={(v) => setSelectedRatio(Number(v))}
          placeholder="Choose a ratio..."
          options={RATIO_SELECT_OPTIONS}
        />
      </InputFieldWrapper>
    )}

    <button
      type="button"
      onClick={onCalculate}
      disabled={!canCalculate}
      className={styles.submitButton}
    >
      Calculate Settings
    </button>
  </div>
);

export default FormCard;
