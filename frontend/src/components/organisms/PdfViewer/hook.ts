import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/pdfjs-express";
import { CustomPdfViewerStyles } from "../../../utils/constants";
import { Result } from "../SearchResult";

export const usePdfViewer = (
  documentUrl: string|undefined,
  searchKey: string|undefined,
  setDocViewerState: (docViewer: any) => void,
  setForcedRerender: (count: any) => void,
  setSearchKeywordOccurrences: (count: any[]) => void,
  setCurrentOccurrenceIndex: (count: number) => void
) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const viewer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/pdfjsexpress",
        initialDoc: documentUrl,
        disabledElements: [
          "ribbons",
          "toolsHeader",
          "header",
          "leftPanelTabs",
          "thumbnailsSizeSlider",
          "leftPanelResizeBar",
          "contextMenuPopup",
          "textPopup",
          "pageNavOverlay",
          "searchPanel",
        ],
      },
      viewer.current
    ).then((instance: any) => {
      const { docViewer, Annotations, UI } = instance;
      const iframeDoc = UI.iframeWindow.document;

      UI.openElements(["leftPanel"]);

      docViewer.addEventListener("pageNumberUpdated", (pageNumber: number) => {
        setPage(pageNumber);
      });
      docViewer.addEventListener("documentLoaded", () => {
        setDocViewerState(docViewer);
        const iframeStyle = document.createElement("style");
        iframeStyle.innerHTML = CustomPdfViewerStyles;

        iframeDoc.documentElement.appendChild(iframeStyle);

        if (searchKey !== "") {
          UI.searchTextFull(`[A-Z][^.!?]*\\b${searchKey}\\b[^.!?]*\\.`, {
            regex: true,
          });
          UI.addSearchListener((a: any, b: any, c: any) =>
            setSearchKeywordOccurrences(c)
          );
        }
        docViewer.setSearchHighlightColors({
          searchResult: new Annotations.Color(255, 255, 0, 0.3),
          activeSearchResult: "rgba(255, 215, 73, 0.25)",
        });
        const totalNumPages = docViewer.getPageCount();
        setTotalPages(totalNumPages);
      });
      setCurrentOccurrenceIndex(0);
    });
  }, [searchKey, documentUrl]);

  return { page, totalPages, viewer };
};

export const usePdfViewerStates = () => {
  const [searchKeywordOccurrences, setSearchKeywordOccurrences] = useState<
    any[]
  >([]);
  const [currentOccurrenceIndex, setCurrentOccurenceIndex] =
    useState<number>(0);
  const [docViewerState, setDocViewerState] = useState<any>({
    getZoomLevel: () => 0.85,
    getPageCount: () => 1,
    getCurrentPage: () => 1,
    zoomTo: () => Object,
    setCurrentPage: (pageNum: number) => Object,
  });
  const [_, setForcedRender] = useState<number>(0);

  useEffect(() => {
    searchKeywordOccurrences.length > 0 &&
      docViewerState.setCurrentPage(
        searchKeywordOccurrences[currentOccurrenceIndex].pageNum
      );
  }, [currentOccurrenceIndex]);
  const decreaseZoom = () => {
    docViewerState.zoomTo(docViewerState.getZoomLevel() - 0.2);
    setForcedRender((prev) => prev + 1);
  };
  const increaseZoom = () => {
    docViewerState.zoomTo(docViewerState.getZoomLevel() + 0.2);
    setForcedRender((prev) => prev + 1);
  };
  return {
    searchKeywordOccurrences,
    setSearchKeywordOccurrences,
    setCurrentOccurenceIndex,
    setDocViewerState,
    setForcedRender,
    decreaseZoom,increaseZoom,
    docViewerState
  };
};

export const getCardContent = (
  searchKeywordOccurrences: any[],
  fileName: string|undefined,
  totalSlides: number
): Result[] => {
  const cardContent: Result[] = [];
  searchKeywordOccurrences.map((occurrence, index) => {
    cardContent.push({
      id: index,
      description: occurrence.resultStr,
      fileName: fileName||'',
      foundOn: occurrence.pageNum,
      totalSlide: totalSlides,
    });
  });
  return cardContent;
};
