/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/preserve-manual-memoization */
import type { RatingChartData } from "../../../types/rating";
import styles from "./AnalystRating.module.scss";
export const AnalystRating = ({
  data,
}: {
  data: RatingChartData[];
}) => {

  return (
    <div className={styles.ratingWrapper}>
      <div className={styles.chartContainer}>
        <ul className={styles.ratingsList}>
          {data.map((item) => (
            <li key={item.y}>
              <span>{item.name}</span>
              <span>{item.y}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
