/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import styles from "./SearchComponent.module.scss";
import { useDebounce } from "use-debounce";
import { useGetSearchNameResultsQuery } from "../../../redux/investmentsApi";
import { SearchHint } from "../SearchHint/SearchHint";
import type { SearchInfo } from "../../../types/search";

export const SearchComponent = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 500);
  const { data } = useGetSearchNameResultsQuery({ name: debouncedValue });
  const [searchResults, setSearchResults] = useState<SearchInfo[]>([]);

  useEffect(() => {
    if (data?.results && data.results.length > 0) {
      setSearchResults(data.results);
    }
  }, [data]);

  useEffect(() => {
    if (debouncedValue.trim() === "" && searchResults.length > 0) {
      setSearchResults([]);
    }
  }, [debouncedValue, searchResults]);

  return (
    <div className={styles.searchWrapper}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search company by name or ticker. Example: MSFT"
      />

      {debouncedValue.trim() !== "" && searchResults.length > 0 && (
        <SearchHint results={searchResults} />
      )}
    </div>
  );
};
