/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo, useState } from "react";
import type { Company } from "../../../types/company";
import styles from "./ProfileList.module.scss";
import { camelToWords } from "../../../helpers/camelToWords";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiPieChart } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import type { RatingChartData } from "../../../types/rating";
import { AnalystRating } from "../../Rating";

interface ProfileListProps {
  profile: Company;
  type: "info" | "ratios" | "ratings";
}

const ignoredKeys = new Set(["ratios", "description", "image"]);

const linkedKeys = new Set(["industry", "sector"]);

export const ProfileList = ({ profile, type }: ProfileListProps) => {
  const { ratios } = profile;
  const [ratings, setRatings] = useState<RatingChartData[]>([])

  console.log(ratings, 'ratings')

  const profileVariantRender = useMemo(() => {
    switch (type) {
      case "info":
        return (
          <ul>
            {Object.keys(profile)
              .filter((key) => !ignoredKeys.has(key))
              .map((key) => (
                <li key={key} className={styles.profileListItem}>
                  <span>{camelToWords(key)}</span>
                  <span>
                    {linkedKeys.has(key.toLowerCase()) ? (
                      //@ts-ignore
                      <Link
                        className={styles.linked}
                        //@ts-ignore
                        to={profile[key]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {/* @ts-ignore */}
                        {profile[key]}
                      </Link>
                    ) : key.toLowerCase().includes("website") ? (
                      //@ts-ignore
                      <Link to={profile[key]} target="_blank" rel="noreferrer">
                        <FaExternalLinkAlt />
                      </Link>
                    ) : (
                      //@ts-ignore
                      profile[key]
                    )}
                  </span>
                </li>
              ))}
          </ul>
        );
      case "ratios":
        return (
          <>
            <h2 className={styles.listTitle}>
              Ratios
              <GiPieChart />
            </h2>
            <ul>
              {Object.keys(ratios!).map(key => {
                if(!key.toLowerCase().includes("analyst")){
                  return(
                    <li key={key} className={styles.profileListItem}>
                      <span>{camelToWords(key)}</span>
                      <span>{ratios![key]}</span>
                    </li>
                  )
                }
              })}
            </ul>
          </>
        );
      case "ratings":
        return (
          <>
            <h2 className={styles.listTitle}>
              Ratings
              <IoStatsChart />
            </h2>
            <AnalystRating data={ratings}/>
          </>
        );
    }
  }, [profile, type, ratios, ratings]); // Добавлены необходимые зависимости

  useEffect(() => {
    if(ratios){
      const result = Object.keys(ratios).filter(key => key.toLowerCase().includes("analyst")).map(item => {
        return {name: camelToWords(item), y: Number(ratios[item])}
      })

      setRatings(result)
    }
  }, [])

  return <>{profileVariantRender}</>;
};
