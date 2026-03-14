export type ToggleOption = {
  value: string;
  label: string;
  sub?: string;
};

export type ToggleGroupProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
};
