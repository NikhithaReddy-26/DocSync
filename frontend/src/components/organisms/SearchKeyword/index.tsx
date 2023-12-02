import { Result as CardResult } from "../SearchResult";
import { Stack } from "@mui/material";
import search from "../../../../public/assets/icons/search.svg";
import InputField from "../../atoms/InputField";
import Icon from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import Image from "../../atoms/Image";
import OtherDocument1 from "../../../../public/images/other-documents1.png";
import OtherDocument2 from "../../../../public/images/other-documents2.png";
import "./style.css";
import { useSearchKeyword } from "./hook";
import { SetStateAction } from "react";


export interface SearchKeywordResult {
  fileId?: number;
  fileName?: string;
  searchResults?: CardResult[];
  filePath?:string
}

export interface SearchKeywordProps {
  fetchResult: (keyword: string) => Promise<SearchKeywordResult[]>;
  handleSearchResultChange?:(keyword:string)=>void;
  setFilePath?:React.Dispatch<SetStateAction<string|undefined>>;
  setFileName?:React.Dispatch<SetStateAction<string|undefined>>;
}

const SearchByKeyword = (props: SearchKeywordProps) => {
  const { fetchResult ,handleSearchResultChange,setFilePath,setFileName} = props;
  const {
    displayResult,
    keywordResults,
    keyword,
    onFocusHandler,
    onBlurHandler,
    setFetchResult,
    onChangeHandler,
  } = useSearchKeyword();

  setFetchResult(fetchResult);

  return (
    <Stack
      direction={"column"}
      position={"relative"}
      data-testid="searchKeyword"
    >
      <Stack height={"2.75rem"} width={"22rem"}>
        <InputField
          variant="filled"
          placeholder="Search"
          data-testid="SearchBox"
          customInputProps={{
            startAdornment: <Icon src={search} alt="search-icon" />,
            style: {
              height: "2.75rem",
              backgroundColor: "rgba(255,255,255,0.4)",
            },
            disableUnderline: true,
          }}
          onChange={(event) => {
            onChangeHandler(event.target.value); 
          }}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </Stack>
      <Stack
        display={displayResult || keywordResults.length > 0 ? "flex" : "none"}
        overflow={"overlay"}
        boxSizing={"border-box"}
        position={"absolute"}
        direction={"column"}
        height={"17.625rem"}
        top={"55px"}
        width={"22rem"}
        paddingLeft={"0.75rem"}
        border={"1px solid"}
        borderColor={theme.palette.grey[100]}
        boxShadow={"0px 21px 32px 0px #D5CEDD"}
        className="custom-scrollbar"
        borderRadius={"0.25rem"}
        sx={{
          background: theme.palette.structural.background1,
        }}
        zIndex={10}
      >
        <MuiTypography children={"Search results"} color={theme.palette.textColor.black} variant="caption1" marginBottom={"0.5rem"} marginTop={"0.5rem"} />
        <Stack
          direction={"column"}
          spacing={"1rem"}
          display={keywordResults.length > 0 ? "flex" : "none"}
        >
          {keywordResults.length === 0
            ? ""
            : keywordResults.map((result) => {
                return (
                  <MuiTypography
                    key={result.fileId}
                    children={result.fileName}
                    variant="body2"
                    color={theme.palette.textColor.lowEmphasis}
                    sx={{ cursor: "pointer" }}
                    onClick={()=>{
                      setFilePath?.(result?.filePath);
                      handleSearchResultChange?.(keyword)
                      setFileName?.(result.fileName)
                      }}
                  />
                );
              })}
        </Stack>
        <MuiTypography
          children={"Other documents"}
          variant="caption1"
          paddingTop={"1rem"}
          paddingBottom={"0.5rem"}
        />
        <Stack
          direction={"row"}
          spacing={"1rem"}
          alignItems={"center"}
          paddingBottom={"1rem"}
        >
          <Image
            src={OtherDocument1}
            alt="other-document-1"
            height={"80px"}
            width={"146px"}
          />
          <Image
            src={OtherDocument2}
            alt="other-document-2"
            height={"80px"}
            width={"146px"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SearchByKeyword;
