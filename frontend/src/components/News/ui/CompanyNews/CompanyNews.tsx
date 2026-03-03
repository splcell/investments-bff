import { createError } from "../../../../helpers/createError";
import { useGetCompanyNewsQuery } from "../../../../redux/investmentsApi";
import { ContentBox } from "../../../ContentBox";
import { Error } from "../../../Error";
import { Skeleton } from "../../../Skeleton";
import { NewsItem } from "../NewsItem/NewsItem";
import styles from './CompanyNews.module.scss'

interface CompanyNewsProps {
  ticker: string;
}

export const CompanyNews = ({ ticker }: CompanyNewsProps) => {
  const { data, isLoading, error } = useGetCompanyNewsQuery({ ticker });

  if(isLoading){
    return(
      <ContentBox title="Last company news">
        <div className={styles.newsWrapper}>
          <Skeleton width={608} height={242}/>
          <Skeleton width={608} height={242}/>
          <Skeleton width={608} height={242}/>
        </div>
      </ContentBox>
    )
  }

  if(error){
    return(
      <ContentBox title="Last company news">
        <div className={styles.newsWrapper}>
          <Error>{createError(error)}</Error>
        </div>
      </ContentBox>
    )
  }

  return (
    <ContentBox title="Last company news">
      <div className={styles.newsWrapper}>
        {data?.map((item) => (
          <NewsItem key={item.id} news={item} isCompany={true} />
        ))}
      </div>
    </ContentBox>
  );
};
