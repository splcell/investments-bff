import { Link } from "react-router-dom";
import type { News } from "../../../../types/news";
import styles from "./NewsItem.module.scss";
import { formatDate } from "../../../../helpers/format-date";

export const NewsItem = ({ news }: { news: News }) => {
  return (
    <div className={styles.newsWrapper}>
      <div className={styles.newsBody}>
        <div className={styles.newsHeader}>
          <Link
            to={news.article_url}
            target="_blank"
            className={styles.newsTitle}
          >
            {news.title}
          </Link>
          <span className={styles.newsDate}>{formatDate(news.published_utc)}</span>
        </div>
        <p>{news.description.slice(0, 300) + "..."}</p>
        <div className={styles.newsFooter}>
          <div className={styles.publisher}>
            <img src={news.publisher.favicon_url} alt={news.publisher.name} />
            <Link to={news.publisher.homepage_url} target="_blank">
              {news.publisher.name}
            </Link>
          </div>
          <div className={styles.tickers}>
            {news.tickers.map(ticker => (
              <Link to={`/company/${ticker}`}>{ticker}</Link>
            ))}
          </div>
          <div className={styles.tags}>
            {
              news.keywords.map(tag => (
                <span>{tag}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
