import type { Company } from "../../../types/company";
import type { Quote } from "../../../types/quote";
import { Skeleton } from "../../Skeleton";
import styles from "./MarketInfo.module.scss";
import cn from "classnames";

interface MarketInfoProps {
  profile: Company;
  data: Quote;
  loading: boolean;
}

export const MarketInfo = ({ profile, data, loading }: MarketInfoProps) => {
  if (loading) {
    return <Skeleton width={640} height={82} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <img
          src={profile.image}
          alt={profile.companyName}
          className={styles.logo}
        />
        <span
          className={cn(styles.companyName, {
            [styles.textHidden]: profile.companyName?.length > 15,
          })}
        >
          {profile.companyName?.length <= 15 ? (
            profile.companyName
          ) : (
            <abbr title={profile.companyName}>{profile.companyName}</abbr>
          )}
        </span>
      </div>
      <div className={styles.changes}>
        <div>
          <span
            className={cn(styles.price, {
              [styles.positivePrice]: data.price > data?.previousClose,
              [styles.negativePrice]: data.price < data?.previousClose,
            })}
          >
            {Number(data.price).toFixed(2)} {profile.currency}
          </span>
          <span
            className={cn(styles.changePercantage, {
              [styles.negative]: data.price < data?.previousClose,
              [styles.positive]: data.price > data?.previousClose,
            })}
          >
            {data?.changePercentage.toFixed(2) + "%"}
          </span>
          <span
            className={cn(styles.change, {
              [styles.positivePrice]: data.price > data.previousClose,
              [styles.negativePrice]: data.price < data.previousClose,
            })}
          >
            {data?.change.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
