import { RATIO_OPTIONS } from "../../constants";
import type { ToggleOption } from "../ToggleGroup/types";

export const RATIO_MODE_OPTIONS: ToggleOption[] = [
  { value: "auto", label: "Auto", sub: "from lengths" },
  { value: "fullness", label: "Fullness", sub: "by feel" },
  { value: "ratio", label: "Ratio", sub: "precise" },
];

export const FULLNESS_OPTIONS: ToggleOption[] = [
  { value: "loose", label: "Loose", sub: "1.5×" },
  { value: "medium", label: "Medium", sub: "2×" },
  { value: "dense", label: "Dense", sub: "3×" },
];

/** Ratio options as string value/label for SelectField (testable). */
export const RATIO_SELECT_OPTIONS = RATIO_OPTIONS.map((o) => ({
  value: String(o.value),
  label: o.label,
}));
