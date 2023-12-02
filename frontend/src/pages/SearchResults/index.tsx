import React, { useContext, useEffect } from "react";
import HomeTemplate from "../../components/templates/Home";
import Sidebar from "../../components/Organisms/Navbar";
import Header from "../../components/organisms/Header";
import Avatar from "../../../public/assets/icons/avatar.svg";
import { Stack } from "@mui/material";
import ArrowBack from "../../../public/assets/icons/arrow-black.svg";
import Icon from "../../components/atoms/Icons";
import MuiTypography from "../../components/atoms/Typography";
import theme from "../../theme";
import PdfjsExpress from "../../components/organisms/PdfViewer";
import { useSearchResults } from "./hook";
import { FilesPage } from "../FilesPage";
import FileBody from "../../components/organisms/FileBody";
import { File } from "../../components/organisms/FileBody/hook";
import { fetchAllFiles } from "../../services/files/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FILE_RESOURCE_URL } from "../../utils/constants";

const SearchResultsPage = () => {
  const { authToken, setUserInfo, setAuthToken, userInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/files");
  };
  const {
    keyword,
    setKeyword,
    filePath,
    setFilePath,
    fileName,
    setFileName,
    fetchResult,
  } = useSearchResults();
  useEffect(() => {
    if (
      sessionStorage.getItem("userDetail") == null ||
      sessionStorage.getItem("userDetail") === undefined
    ) {
      navigate("/");
    }
    const userDetail = sessionStorage.getItem("userDetail");
    const userData = JSON.parse(userDetail || "");
    setUserInfo?.(userData.userDetail);
    setAuthToken?.(sessionStorage.getItem("authToken") || "");
  }, []);
  return (
    <>
      <HomeTemplate
        header={
          <Header
            userId={"12345"}
            userName={userInfo?.name}
            avatarSrc={Avatar}
            fetchResults={fetchResult}
            setFileName={setFileName}
            setFilePath={setFilePath}
            handleSearchResultChange={setKeyword}
          />
        }
        sideBar={<Sidebar itemid="files" />}
        bodyContent={
          <>
            {keyword === "" ? (
              <FileBody fetchFiles={() => fetchAllFiles(authToken)} />
            ) : (
              <>
                <Stack direction="row">
                  <Stack
                    direction="row"
                    spacing="1rem"
                    marginTop="28px"
                    marginLeft="1.5rem"
                  >
                    <Icon
                      src={ArrowBack}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                    <MuiTypography
                      children={fileName}
                      variant={"h2"}
                      color={theme.palette.textColor.black}
                    />
                  </Stack>
                </Stack>

                <Stack mt="1rem" ml="-2rem">
                  <PdfjsExpress
                    searchKey={keyword}
                    documentUrl={`${FILE_RESOURCE_URL}${filePath}`}
                    fileName={fileName}
                  />
                </Stack>
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default SearchResultsPage;
