import { useState } from "react";

export const useSearchResult = (
  setOccurenceIndex?: React.Dispatch<React.SetStateAction<number>>
) => {
  const [activeResult, setActiveResult] = useState<number>(0);
  const [displayDescription, setDisplayDescription] = useState<boolean>(true);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const onNext = (length: number) => {
    activeResult < length - 1 && setActiveResult((current) => current + 1);
    activeResult < length - 1 && setOccurenceIndex?.((current) => current + 1);
  };

  const onPrev = () => {
    activeResult > 0 && setActiveResult((current) => current - 1);
    activeResult > 0 && setOccurenceIndex?.((current) => current - 1);
  };

  const toggleDisplayDescription = () => {
    setDisplayDescription((current) => !current);
  };

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowSnackBar(true);
  };

  const closeSnackBar = () => {
    setShowSnackBar(false);
  };

  return {
    activeResult,
    displayDescription,
    showSnackBar,
    onNext,
    onPrev,
    toggleDisplayDescription,
    onCopy,
    closeSnackBar,
  };
};
