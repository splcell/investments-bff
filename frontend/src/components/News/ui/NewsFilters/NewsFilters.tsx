/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, memo } from "react";
import type { News } from "../../../../types/news";
import styles from "./NewsFilters.module.scss";

interface NewsFilterProps {
  news: News[];
  setFilteredNews: React.Dispatch<React.SetStateAction<News[]>>;
}

export const NewsFilters = memo(
  ({ news, setFilteredNews }: NewsFilterProps) => {
    const currentPublisher = sessionStorage.getItem("publisher") as string;
    const [choicePublishers, setChoicePublishers] = useState<string[]>(
      currentPublisher ? [currentPublisher] : []
    );
    const publishers = Array.from(
      new Set(news.map((item) => item.publisher.name).filter(Boolean))
    );

    const onClickHandler = (item: string) => {
      if (choicePublishers.includes(item)) {
        const newPublishers = choicePublishers.filter((el) => el !== item);
        setChoicePublishers(newPublishers);
        sessionStorage.removeItem("publisher")
        return;
      }

      sessionStorage.setItem("publisher", item);
      setChoicePublishers((prev) => [...prev, item]);
    };

    useEffect(() => {
      if (choicePublishers.length > 0) {
        const filteredNews = news.filter((el) =>
          choicePublishers.includes(el.publisher.name)
        );

        setFilteredNews(filteredNews);
        return;
      }

      setFilteredNews(news);
    }, [choicePublishers, news]);

    return (
      <div className={styles.filtersWrapper}>
        <div className={styles.publishers}>
          <h3>Publishers</h3>
          <div>
            {publishers.map((item, index) => (
              <button
                className={
                  choicePublishers.includes(item)
                    ? styles.choicedBtn
                    : styles.pubBtn
                }
                key={index}
                onClick={() => onClickHandler(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
