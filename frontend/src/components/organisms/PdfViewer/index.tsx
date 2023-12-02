import React, { CSSProperties } from "react";
import Pagination from "../../molecules/Pagination";
import { Stack } from "@mui/material";
import { getCardContent, usePdfViewer, usePdfViewerStates } from "./hook";
import SearchResult from "../SearchResult";

type Props = {
  searchKey: string;
  documentUrl: string|undefined;
  fileName:string|undefined;
};

const styles: {
  viewerStyle: CSSProperties;
} = {
  viewerStyle: {
    height: "90vh",
  },
};

const PdfjsExpress = ({ searchKey, documentUrl,fileName }: Props) => {
  const {
    searchKeywordOccurrences,
    setSearchKeywordOccurrences,
    setCurrentOccurenceIndex,
    setDocViewerState,
    setForcedRender,
    decreaseZoom,
    increaseZoom,
    docViewerState
  } = usePdfViewerStates();

  const { page, totalPages, viewer } = usePdfViewer(
    documentUrl,
    searchKey,
    setDocViewerState,
    setForcedRender,
    setSearchKeywordOccurrences,
    setCurrentOccurenceIndex,

  );


  const cardResult = getCardContent(
    searchKeywordOccurrences,
    fileName,
    totalPages
  );

  return (
    <Stack>
      <Stack zIndex="1" position="absolute" top="5.25rem" right="2rem">
        <SearchResult
          searchResults={cardResult}
          searchedText={searchKey}
          setOccurenceIndex={setCurrentOccurenceIndex}
        />
      </Stack>
      <Stack ref={viewer} style={styles.viewerStyle}></Stack>
      <Stack position={"fixed"} width={"100%"} top={"90vh"} left={"50vw"}>
        <Pagination currentPage={page} totalPages={totalPages}   onZoomIn={increaseZoom}
          onZoomOut={decreaseZoom}
          zoomValue={Math.round(docViewerState.getZoomLevel() * 100)}
          />
      </Stack>
    </Stack>
  );
};

export default PdfjsExpress;
