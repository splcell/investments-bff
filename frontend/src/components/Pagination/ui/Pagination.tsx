/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Pagination.module.scss";
import cn from 'classnames';

interface PaginationProps{
  data: any[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  className?: string
}

export const Pagination = ({ data, page, setPage, className }: PaginationProps) => {
  const displayLimit = 10;
  const totalPages = Math.ceil(data.length / displayLimit); // Используем Math.ceil для корректного округления
  const items = [];

  for (let i = 1; i <= totalPages; i++) {
    items.push(i);
  }

  const prevHandler = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextHandler = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const endHandler = () => {
    setPage(totalPages);
  };

  const startHandler = () => {
    setPage(1);
  };

  return (
    <div className={cn(styles.paginationWrapper, className)}>
      <button onClick={startHandler} disabled={page === 1}>{"<<"}</button>
      <button onClick={prevHandler} disabled={page === 1}>{"<"}</button>

      {totalPages > displayLimit && (
        <>
          {page > 3 && <button onClick={() => setPage(1)}>1</button>}
          {page > 4 && <span>...</span>}

          {items.map((item) => {
            if (item >= page - 3 && item <= page + 3) {
              return (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={cn({
                    [styles.active]: item === page,
                  })}
                >
                  {item}
                </button>
              );
            }
            return null; // Не отображаем другие кнопки
          })}

          {page < totalPages - 3 && <span>...</span>}
          {page < totalPages - 2 && (
            <button onClick={() => setPage(totalPages)}>{totalPages}</button>
          )}
        </>
      )}

      {totalPages <= displayLimit && items.map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={cn({
            [styles.active]: item === page,
          })}
        >
          {item}
        </button>
      ))}

      <button onClick={nextHandler} disabled={page === totalPages}>{">"}</button>
      <button onClick={endHandler} disabled={page === totalPages}>{">>"}</button>
    </div>
  );
};