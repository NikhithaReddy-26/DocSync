import { Divider, Stack, styled } from "@mui/material";
import MuiTypography from "../../atoms/Typography";
import Icon from "../../atoms/Icons";
import UpArrow from "../../../../public/assets/icons/up-arrow-dark.svg";
import DownArrow from "../../../../public/assets/icons/down-arrow.svg";
import DownArrowLight from "../../../../public/assets/icons/down-arrow-light.svg";
import UpArrowLight from "../../../../public/assets/icons/up-arrow-light.svg";
import Minimize from "../../../../public/assets/icons/minimize.svg";
import Maximize from "../../../../public/assets/icons/maximize.svg";
import { useSearchResult } from "./hook";
import CopyIcon from "../../../../public/assets/icons/paste-icon.svg";
import MoreIcon from "../../../../public/assets/icons/three-dots.svg";
import theme from "../../../theme";
import MuiSnackbar from "../../molecules/SnackBar";

export interface Result {
  id: number;
  fileName: string;
  description: string;
  foundOn: number;
  totalSlide: number;
}

export interface SearchResultProps {
  searchResults: Result[];
  searchedText: string;
  setOccurenceIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const searchIndex = (mainString: string, searchString: string) => {
  const mainStringLower = mainString.toLowerCase();
  const searchStringLower = searchString.toLowerCase();
  return mainStringLower.indexOf(searchStringLower);
};

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const { searchResults, searchedText, setOccurenceIndex } = props;
  const {
    activeResult,
    displayDescription,
    showSnackBar,
    onNext,
    onPrev,
    toggleDisplayDescription,
    onCopy,
    closeSnackBar,
  } = useSearchResult(setOccurenceIndex);

  const WrapperStack = styled(Stack)(() => ({
    width: "24.125rem",
    background: theme.palette.structural.structuralBg,
    borderRadius: "0.5rem",
    boxShadow: "0rem 0.125rem 1rem 0rem rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
  }));

  const getCardHeader = () => {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          height="2.5rem"
          width="24.125rem"
          paddingX="0.313rem"
          paddingY="0.75rem"
          boxSizing="border-box"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="15.125rem"
            height="1.875rem"
          >
            <MuiTypography
              children={searchedText}
              variant="body2"
              paddingLeft="0.625rem"
            />
            <Stack direction="row" spacing={2}>
              <MuiTypography
                children={
                  <>
                    {!searchResults[activeResult] ? 0 : activeResult + 1}
                    <span
                      style={{ color: theme.palette.textColor.lowEmphasis }}
                    >
                      /{searchResults.length}
                    </span>
                  </>
                }
                variant="body2"
              />
              <Divider orientation="vertical" flexItem variant="middle" />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            height="1.5rem"
            width="6.5rem"
            justifyContent="space-between"
            alignItems="center"
          >
            <Icon
              src={activeResult === 0 ? UpArrowLight : UpArrow}
              alt="up-arrow"
              onClick={onPrev}
              style={{cursor:'pointer'}}
            />
            <Icon
              src={
                activeResult === searchResults.length - 1
                  ? DownArrowLight
                  : DownArrow
              }
              alt="down-arrow"
              onClick={() => {
                onNext(searchResults.length);
              }}
              style={{cursor:'pointer'}}
            />
            <Icon
              src={displayDescription ? Minimize : Maximize}
              alt="toggle-display-icon"
              onClick={toggleDisplayDescription}
              style={{cursor:'pointer'}}
            />
          </Stack>
        </Stack>
        <Divider variant="fullWidth" flexItem />
      </>
    );
  };

  if (!searchResults[activeResult]) {
    return (
      <WrapperStack
        direction="column"
        alignItems="center"
        data-testid="searchResultCard"
      >
        {getCardHeader()}
      </WrapperStack>
    );
  }

  const searchStringIndex = searchIndex(
    searchResults[activeResult].description,
    searchedText
  );

  const initDescriptionString = searchResults[
    activeResult
  ].description.substring(0, searchStringIndex);

  const mainSubstring =
    searchResults[activeResult].description.substring(searchStringIndex);

  const searchedString = mainSubstring.substring(0, searchedText.length);

  const endDescriptionString = searchResults[
    activeResult
  ].description.substring(searchStringIndex + searchedText.length);

  const getSlideNumberContext = () => {
    return (
      <>
        SLIDE
        <span
          style={{
            color: theme.palette.textColor.black,
            marginLeft: "0.25rem",
          }}
        >
          {searchResults[activeResult].foundOn}
        </span>
        /{searchResults[activeResult].totalSlide}
      </>
    );
  };

  const getDescriptionContext = () => {
    return (
      <>
        {initDescriptionString}
        <span
          style={{
            color: theme.palette.textColor.black,
            fontWeight: 700,
          }}
        >
          {searchedString}
        </span>
        {endDescriptionString}
      </>
    );
  };

  return (
    <Stack
      position="relative"
      width="24.125rem"
      height="15.625rem"
      alignItems="flex-end"
      zIndex="1"
    >
      <WrapperStack
        direction="column"
        alignItems="center"
        data-testid="searchResultCard"
      >
        {getCardHeader()}
        <Stack
          spacing={3}
          paddingX="1.25rem"
          paddingY="0.75rem"
          display={displayDescription ? "flex" : "none"}
          boxSizing="border-box"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="2.625rem"
            width="21.125rem"
          >
            <Stack>
              <MuiTypography
                children={searchResults[activeResult].fileName}
                variant="body1"
              />
              <MuiTypography
                variant="overline1"
                color={theme.palette.textColor.mediumEmphasis}
                children={getSlideNumberContext()}
              />
            </Stack>
            <Stack direction="row" spacing={3}>
              <Icon
                src={CopyIcon}
                alt="copy-icon"
                onClick={() => {
                  onCopy(searchResults[activeResult].description);
                }}
                style={{cursor:'pointer'}}
              />
              <Icon src={MoreIcon} alt="more-icon"/>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            height="3.75rem"
            width="21.125rem"
          >
            <MuiTypography
              variant="description"
              color={theme.palette.textColor.lowEmphasis}
              children={getDescriptionContext()}
              gutterBottom
            />
          </Stack>
        </Stack>
      </WrapperStack>
      <Stack
        boxSizing="border-box"
        position="absolute"
        bottom="-1.5rem"
        right="-1.5rem"
        height="2.5rem"
        width="12.5rem"
      >
        <MuiSnackbar
          onCloseHandler={closeSnackBar}
          width="12.5rem"
          isOpen={showSnackBar}
          message="Text copied"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          style={{cursor:'pointer'}}
        />
      </Stack>
    </Stack>
  );
};

export default SearchResult;
