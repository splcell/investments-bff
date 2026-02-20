import { useGetCompanyReportsQuery } from "../../../redux/investmentsApi";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { IoChevronDownOutline } from "react-icons/io5";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ContentBox } from "../../ContentBox";
import styles from "./Reports.module.scss";
import { AnnualBalanceChart } from "../AnnualReports/AnnualBalanceChart/AnnualBalanceChart";
import type { Company } from "../../../types/company";
import { AnnualBalanceTable } from "../AnnualReports/AnnualBalanceTable/AnnualBalanceTable";
import { AnnualIncomeChart } from "../AnnualReports/AnnualIncomeChart/AnnualIncomeChart";
import { AnnualIncomeTable } from "../AnnualReports/AnnualIncomeTable/AnnualIncomeTable";
import { AnnualCashFlowChart } from "../AnnualReports/AnnualCashFlowChart/AnnualCashFlowChart";
import { AnnualCashFlowTable } from "../AnnualReports/AnnualCashFlowTable/AnnualCashFlowTable";
import { QuarterlyBalanceChart } from "../QuarterReports/QuarterlyBalanceChart/QuarterlyBalanceChart";
import { QuarterlyBalanceTable } from "../QuarterReports/QuarterlyBalanceTable/QuarterlyBalanceTable";
import { QuarterlyIncomeChart } from "../QuarterReports/QuarterlyIncomeChart/QuarterlyIncomeChart";
import { QuarterlyIncomeTable } from "../QuarterReports/QuarterlyIncomeTable/QuarterlyIncomeTable";
import { QuarterlyCashFlowChart } from "../QuarterReports/QuarterlyCashFlowChart/QuarterlyCashFlowChart";
import { QuarterlyCashFlowTable } from "../QuarterReports/QuarterlyCashFlowTable/QuarterlyCashFlowTable";
import { Skeleton } from "../../Skeleton";
import { Error } from "../../Error";
import { createError } from "../../../helpers/createError";

export const Reports = ({
  ticker,
  profile,
}: {
  ticker: string;
  profile: Company;
}) => {
  const { data, isLoading, error } = useGetCompanyReportsQuery({
    ticker,
    period: "annual",
  });
  const {
    data: quarterData,
    isLoading: quarterIsLoading,
    error: quarterError,
  } = useGetCompanyReportsQuery({ ticker, period: "quarter" });

  if (isLoading || quarterIsLoading) {
    return (
      <ContentBox title="Financial Results" className={styles.reportsWrapper}>
        <div className={styles.skeletonWrapper}>
          <Skeleton
            className={styles.reportsSkeleton}
            width={608}
            height={35}
          />
          <Skeleton
            className={styles.reportsSkeleton}
            width={608}
            height={35}
          />
          <Skeleton
            className={styles.reportsSkeleton}
            width={608}
            height={35}
          />
        </div>
      </ContentBox>
    );
  }

  if (error) {
    return (
      <ContentBox title="Financial Results" className={styles.reportsWrapper}>
        <Error>{createError(error)}</Error>
      </ContentBox>
    );
  }

  if (quarterError) {
    return (
      <ContentBox title="Financial Results" className={styles.reportsWrapper}>
        <Error>{createError(quarterError)}</Error>
      </ContentBox>
    );
  }

  return (
    <ContentBox title="Financial Results" className={styles.reportsWrapper}>
      <Accordion>
        <AccordionItem
          header={
            <>
              Balance Sheet
              <IoChevronDownOutline />
            </>
          }
          className={styles.header}
          initialEntered
        >
          <Tabs>
            <TabList className={styles.tabsList}>
              <Tab className={styles.reportsTab}>Annual</Tab>
              <Tab className={styles.reportsTab}>Quarterly</Tab>
            </TabList>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {data?.balance && (
                  <AnnualBalanceChart
                    balance={data?.balance}
                    profile={profile}
                  />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {data && data.balance && (
                  <AnnualBalanceTable
                    balance={data.balance}
                    profile={profile}
                  />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {quarterData?.balance && (
                  <QuarterlyBalanceChart
                    balance={quarterData.balance}
                    profile={profile}
                  />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {quarterData?.balance && (
                  <QuarterlyBalanceTable
                    balance={quarterData.balance}
                    profile={profile}
                  />
                )}
              </div>
            </TabPanel>
          </Tabs>
        </AccordionItem>
        <AccordionItem
          header={
            <>
              Income Statement
              <IoChevronDownOutline />
            </>
          }
          className={styles.header}
        >
          <Tabs>
            <TabList className={styles.tabsList}>
              <Tab className={styles.reportsTab}>Annual</Tab>
              <Tab className={styles.reportsTab}>Quarterly</Tab>
            </TabList>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {data?.income && (
                  <AnnualIncomeChart income={data?.income} profile={profile} />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {data?.income && (
                  <AnnualIncomeTable profile={profile} income={data.income} />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {quarterData?.income && (
                  <QuarterlyIncomeChart
                    income={quarterData.income}
                    profile={profile}
                  />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {quarterData?.income && (
                  <QuarterlyIncomeTable
                    income={quarterData.income}
                    profile={profile}
                  />
                )}
              </div>
            </TabPanel>
          </Tabs>
        </AccordionItem>
        <AccordionItem
          header={
            <>
              Cash Flow Statement
              <IoChevronDownOutline />
            </>
          }
          className={styles.header}
        >
          <Tabs>
            <TabList className={styles.tabsList}>
              <Tab className={styles.reportsTab}>Annual</Tab>
              <Tab className={styles.reportsTab}>Quarterly</Tab>
            </TabList>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {data?.cashFlow && (
                  <AnnualCashFlowChart
                    cashFlow={data.cashFlow}
                    profile={profile}
                  />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {data?.cashFlow && (
                  <AnnualCashFlowTable
                    cashFlow={data.cashFlow}
                    profile={profile}
                  />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles.chartWrapper}>
                {quarterData?.cashFlow && (
                  <QuarterlyCashFlowChart
                    cashFlow={quarterData.cashFlow}
                    profile={profile}
                  />
                )}
              </div>
              <div className={styles.tableWrapper}>
                {quarterData?.cashFlow && (
                  <QuarterlyCashFlowTable
                    cashFlow={quarterData.cashFlow}
                    profile={profile}
                  />
                )}
              </div>
            </TabPanel>
          </Tabs>
        </AccordionItem>
      </Accordion>
    </ContentBox>
  );
};
