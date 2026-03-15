import styles from "./ResultCard.module.css";

export type ResultCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  wide?: boolean;
};

const ResultCard = ({
  label,
  value,
  sub,
  accent,
  wide,
}: ResultCardProps) => (
    <div
      className={[
        styles.resultCard,
        accent && styles.resultCard_accent,
        wide && styles.resultCard_wide,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          styles.resultCardLabel,
          accent && styles.resultCardLabel_accent,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </div>
      <div
        className={[
          styles.resultCardValue,
          accent && styles.resultCardValue_accent,
          wide && styles.resultCardValue_wide,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </div>
      {sub && (
        <div
          className={[
            styles.resultCardSub,
            accent && styles.resultCardSub_accent,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {sub}
        </div>
      )}
    </div>
  );

export default ResultCard;
