import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { ContentBox } from "../../ContentBox";
import styles from "./Description.module.scss";
import type { Company } from "../../../types/company";
import { Skeleton } from "../../Skeleton";
import { Error } from "../../Error";
import { ProfileList } from "../../ProfileList";

interface DescriptionProps {
  profile: Company;
  isLoading: boolean;
  error?: string | null;
}

const boxTitle = "Company Overview";

export const Description = ({
  profile,
  isLoading,
  error,
}: DescriptionProps) => {
  const [isFull, setIsFull] = useState(false);

  const toggleDescriptionHandler = () => {
    setIsFull(!isFull);
  };

  //318 X 212

  if (isLoading) {
    return (
      <ContentBox className={styles.profileContent} title={boxTitle}>
        <Skeleton width={318} height={212} />
      </ContentBox>
    );
  }

  if (error) {
    return (
      <ContentBox className={styles.profileContent} title={boxTitle}>
        <Error>{error}</Error>
      </ContentBox>
    );
  }

  return (
    <>
      <ContentBox className={styles.profileContent} title={boxTitle}>
        {!isFull && profile.description?.length > 300 ? (
          <p className={styles.description}>
            {profile.description?.slice(0, 300) + "..."}
          </p>
        ) : (
          <p className={styles.description}>{profile.description}</p>
        )}
        {profile.description?.length > 300 ? (
          <span
            className={styles.toggleDescription}
            onClick={toggleDescriptionHandler}
          >
            <IoChevronDownOutline className={isFull ? styles.rotate : ""} />
          </span>
        ) : null}
        <div className={styles.descrInfoBox}>
          <ProfileList profile={profile} type="info" />
          <ProfileList profile={profile} type="ratios" />
          <ProfileList profile={profile} type="ratings" />
        </div>
      </ContentBox>
    </>
  );
};
