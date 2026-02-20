/* eslint-disable react-hooks/set-state-in-effect */
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { News } from "../../../../types/news";
import type { SerializedError } from "@reduxjs/toolkit";
import { Container } from "../../../Container";
import { NewsItem } from "../NewsItem/NewsItem";
import styles from "./NewsList.module.scss";
import { Filter } from "../../../../assets/icons/Filter";
import { useState } from "react";
import { Tooltip } from "../../../Tooltip";
import { NewsFilters } from "../NewsFilters/NewsFilters";

interface NewsListProps {
  news: News[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const NewsList = ({ news, isLoading, error }: NewsListProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [filteredNews, setFilteredNews] = useState<News[]>(news);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error</h3>;
  }

  console.log(news, "news");

  return (
    <Container>
      <div className={styles.newsInner}>
        <h2>Hot News</h2>
        <div className={styles.filtersWrapper}>
          <button onClick={() => setShowTooltip((prev) => !prev)}>
            <Filter />
            Filters
          </button>
          {showTooltip && (
            <Tooltip className={styles.filtersTooltip}>
              <NewsFilters news={news} setFilteredNews={setFilteredNews} />
            </Tooltip>
          )}
        </div>
      </div>
      <div className={styles.newsWrapper}>
        {filteredNews?.length > 0
          ? filteredNews?.map((item) => <NewsItem key={item.id} news={item} />)
          : news?.map((item) => <NewsItem key={item.id} news={item} />)}
      </div>
    </Container>
  );
};
