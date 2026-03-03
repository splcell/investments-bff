import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { ContentBox } from "../../ContentBox";
import styles from "./Description.module.scss";
import type { Company } from "../../../types/company";
import { Skeleton } from "../../Skeleton";
import { Error } from "../../Error";
// import { ProfileList } from "../../ProfileList/ui/ProfileList";

interface DescriptionProps{
  profile: Company;
  isLoading: boolean;
  error?: string | null
}

export const Description = ({ profile, isLoading, error }: DescriptionProps) => {
  const [isFull, setIsFull] = useState(false);

  const toggleDescriptionHandler = () => {
    setIsFull(!isFull);
  };

  //318 X 212

  if(isLoading){
    return(
      <ContentBox className={styles.profileContent} title="Company Overview">
        <Skeleton width={318} height={212}/>
      </ContentBox>
    )
  }

  if(error){
    return(
      <ContentBox className={styles.profileContent} title="Company Overview">
        <Error>{error}</Error>
      </ContentBox>
    )
  }

  return (
    <ContentBox className={styles.profileContent} title="Company Overview">
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
      {/* <ProfileList profile={profile} /> */}
    </ContentBox>
  );
};