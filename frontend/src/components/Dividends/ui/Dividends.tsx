/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
import { ContentBox } from "../../ContentBox";
// import { ContentWrapper } from "../../ContentWrapper/ui/ContentWrapper";
import styles from "./Dividends.module.scss";
import { useState, useEffect, useCallback } from "react";
import { useLazyGetCompanyDividendsQuery } from "../../../redux/investmentsApi";
import type { Company } from "../../../types/company";
import { DividendsTable } from "./DividendsTable/DividendsTable";
import type { Dividend } from "../../../types/dividends";
import { Error } from "../../Error";
import { Pagination } from "../../Pagination";
import { Skeleton } from "../../Skeleton";
import { createError } from "../../../helpers/createError";

interface DividendsProps {
  ticker: string;
  profile: Company;
}

export const Dividends = ({ ticker, profile }: DividendsProps) => {
  const [getDividends, { data, isLoading, error }] =
    useLazyGetCompanyDividendsQuery();
  const [dividends, setDividends] = useState<Dividend[]>([]);
  const [page, setPage] = useState(1);
  const totalResults = 10;
  const indexOfLastPage = page * totalResults;
  const indexOfFirstPage = indexOfLastPage - totalResults;

  const getDividendsHandler = useCallback(() => {
    if (ticker) {
      getDividends({
        ticker,
      });
    }
  }, [ticker]);

  useEffect(() => {
    if (ticker) {
      getDividendsHandler();
    }
  }, [ticker]);

  useEffect(() => {
    if (data && data.length > 0) {
      setDividends(data);
    }
  }, [data]);

  if(isLoading){
    return(
      <ContentBox title="Dividends" variant="no-border">
        <Skeleton width={608} height={204}/>
      </ContentBox>
    )
  }
  
  if(error){
    return(
      <ContentBox title="Dividends" variant="no-border">
        <Error>{createError(error)}</Error>
      </ContentBox>
    )
  }

  return (
    <ContentBox title="Dividends" variant="no-border">
      {data && data.length > 0 ? (
        <DividendsTable
          dividends={[...dividends].reverse().slice(indexOfFirstPage, indexOfLastPage)}
          profile={profile}
        />
      ): <Error>Dividends info not found</Error>}
      <Pagination 
        data={dividends}
        page={page}
        setPage={setPage}
        className={styles.divPagination}
      />
    </ContentBox>
  );
};
