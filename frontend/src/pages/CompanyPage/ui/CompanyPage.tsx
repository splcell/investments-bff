import { useParams } from "react-router-dom";
import {
  useLazyGetCompanyInfoQuery,
  useLazyGetCompanyQuoteQuery,
} from "../../../redux/investmentsApi";
import { useEffect } from "react";
import { Container } from "../../../components/Container";
import styles from "./CompanyPage.module.scss";
import { MarketInfo } from "../../../components/MarketInfo";
import CompanyChart from "../../../components/CompanyChart/ui/CompanyChart";
import { Minmax } from "../../../components/Minmax";
import { Reports } from "../../../components/Reports";
import { Error } from "../../../components/Error";
import { createError } from "../../../helpers/createError";

export const CompanyPage = () => {
  const { ticker } = useParams();
  const [getCompanyInfo, { data, isLoading, error }] =
    useLazyGetCompanyInfoQuery();
  const [
    getCompanyQuote,
    { data: quote, isLoading: quoteLoading, error: quoteError },
  ] = useLazyGetCompanyQuoteQuery();

  useEffect(() => {
    if (!ticker) return;

    getCompanyInfo({ ticker });
    getCompanyQuote({ ticker });
  }, []);

  if (error) {
    <Container>
      <div className={styles.profileInner}>
        <Error>{createError(error)}</Error>
      </div>
    </Container>;
  }

  if (quoteError) {
    <Container>
      <div className={styles.profileInner}>
        <Error>{createError(quoteError)}</Error>
      </div>
    </Container>;
  }

  return (
    <Container>
      <div className={styles.profileInner}>
        <div className={styles.profileWrapper}>
          {data && quote ? (
            <>
              <MarketInfo
                profile={data}
                data={quote}
                loading={isLoading || quoteLoading}
              />
              {ticker && (
                <CompanyChart
                  company={data}
                  ticker={ticker}
                  isLoading={isLoading || quoteLoading}
                />
              )}
              <Minmax
                profile={data}
                metrics={quote}
                isLoading={isLoading || quoteLoading}
              />
              {ticker && <Reports ticker={ticker} profile={data} />}
            </>
          ) : (
            <Error>Company Data not Found</Error>
          )}
        </div>
        <div className={styles.infoWrapper}></div>
      </div>
    </Container>
  );
};
