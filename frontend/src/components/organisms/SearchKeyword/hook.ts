import { useState } from "react";
import { SearchKeywordResult } from ".";

const DELAY_TIME = 500;

export const useSearchKeyword = () => {
  const [displayResult, setDisplayResult] = useState<boolean>(false);
  const [keywordResults, setKeywordResults] = useState<SearchKeywordResult[]>(
    []
  );
  const [keyword, setKeyword] = useState<string>("");
  const optimizeSearch = (
    search: (keyword: string) => Promise<void>,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;
    return (keyword: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        search(keyword);
      }, delay);
    };
  };

  let fetchResult: (keyword: string) => Promise<SearchKeywordResult[]>;

  const setFetchResult = (
    fetch: (keyword: string) => Promise<SearchKeywordResult[]>
  ) => {
    fetchResult = fetch;
  };

  const getResultCall = async (keyword: string) => {
    setKeyword(keyword);
    try {
      if (keyword.length >= 3) {
        const result = await fetchResult(keyword);
        setKeywordResults(result);
      } else {
        setKeywordResults([]);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const onChangeHandler = optimizeSearch(getResultCall, DELAY_TIME);

  const onFocusHandler = () => {
    setDisplayResult(true);
  };

  const onBlurHandler = () => {
    setDisplayResult(false);
  };

  // not finalized yet
  const onClickHandler = (id: number) => {};

  return {
    keywordResults,
    displayResult,
    keyword,
    optimizeSearch,
    onFocusHandler,
    onBlurHandler,
    setKeywordResults,
    onClickHandler,
    setFetchResult,
    onChangeHandler,
  };
};
