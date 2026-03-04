export const MATERIALS = [
    { value: "quilting_cotton", label: "100% Quilting Cotton", stiffness: "medium" },
    { value: "chiffon", label: "Chiffon / Georgette", stiffness: "light" },
    { value: "linen", label: "Linen", stiffness: "heavy" },
    { value: "lawn", label: "Cotton Lawn / Voile", stiffness: "light" },
    { value: "denim", label: "Denim / Canvas", stiffness: "heavy" },
  ];
  
  // Base SPI per material — then adjusted up/down by fullness target
// Shorter stitch = more fullness; longer stitch = less fullness
export const SPI_BASE = {
    quilting_cotton: 9,
    chiffon: 9,
    linen: 8,
    lawn: 9,
    denim: 7,
  };

  // spiDelta: dense = -1 (lower SPI = longer stitch = more fullness)
//           loose = +1 (higher SPI = shorter stitch = less fullness)
export const FULLNESS_SETTINGS = {
    loose:  { label: "Loose",  ratio: 1.5, leverSlot: 12, screwTurn: "loose",  spiDelta: +1, description: "Soft, gentle waves" },
    medium: { label: "Medium", ratio: 2.0, leverSlot: 6,  screwTurn: "medium", spiDelta:  0, description: "Classic ruffled look" },
    dense:  { label: "Dense",  ratio: 3.0, leverSlot: 1,  screwTurn: "tight",  spiDelta: -1, description: "Full, voluminous gathers" },
  };

export const SCREW_LABELS = {
    loose:  "Loosen fully — hint of fullness only",
    medium: "Half-turn — moderate fullness",
    tight:  "Tighten fully — deepest pleats",
  };
  
export const RATIO_OPTIONS = [
    { value: 1.5, label: "1.5×  — Loose" },
    { value: 2.0, label: "2×  — Medium" },
    { value: 2.5, label: "2.5×  — Full" },
    { value: 3.0, label: "3×  — Dense" },
];