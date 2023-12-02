import { Box, Grid, ThemeProvider } from "@mui/material";
import theme from "../../theme";
import HomeTemplate from "../../components/templates/Home";
import Header from "../../components/organisms/Header";
import Sidebar from "../../components/Organisms/Navbar";
import MuiTypography from "../../components/atoms/Typography";
import NoFileInfo from "../../components/molecules/NoFileInfo";
import FileInfo from "../../components/molecules/FileInfo";
import { Key, useContext, useEffect } from "react";
import PdfIcon from "../../../public/assets/icons/pdf.svg";
import { useLandingPageState } from "./hooks";
import DummyImage from "../../../public/images/image.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext, useAuthContext } from "../../context/authContext";
import Avatar from "../../../public/assets/icons/avatar.svg";
import { useNavigate } from "react-router-dom";
interface FileData {
  fileId: Key | null | undefined;
  fileName: string | undefined;
  filePath: string;
}
const ErrorComponent = ({ errorMessage }: { errorMessage: string }) => (
  <div data-testid="error-message">{errorMessage}</div>
);

const ContentComponent = ({ fileData }: { fileData: FileData[] }) => (
  <>
    <Box padding={"24px"} display={"flex"} justifyContent={"flex-start"}>
      <MuiTypography
        children={"Home"}
        variant="h2"
        color={theme.palette.textColor.black}
      />
    </Box>
    <Box padding={"24px"} display={"flex"} justifyContent={"flex-start"}>
      <MuiTypography
        children={"Recent"}
        variant="h3"
        color={theme.palette.textColor.lowEmphasis}
      />
    </Box>
    <Grid container gap="20px" padding={"24px"}>
      {fileData.map(
        (file: {
          fileId: Key | null | undefined;
          fileName: string | undefined;
        }) => (
          <FileInfo
            key={file.fileId}
            fileName={file.fileName}
            fileImageSrc={DummyImage}
            iconSrc={PdfIcon}
            data-testid="file-info"
          />
        )
      )}
    </Grid>
  </>
);

const NoFilesComponent = () => (
  <>
    <Box padding={"24px"} display={"flex"} justifyContent={"flex-start"}>
      <MuiTypography
        children={"Home"}
        variant="h2"
        color={theme.palette.textColor.black}
      />
    </Box>
    <Box
      padding={"12%"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <NoFileInfo data-testid="no-file-info" />
    </Box>
  </>
);

const LandingPage = () => {
  const { fileData, fetchError } = useLandingPageState();

  const getContentComponent = () => {
    if (fetchError) {
      return <ErrorComponent errorMessage={fetchError} />;
    } else if (fileData && fileData.length > 0) {
      return <ContentComponent fileData={fileData} />;
    } else {
      return <NoFilesComponent />;
    }
  };
  const { user, isAuthenticated } = useAuth0();
  const { checkUserExistOrRegister } = useAuthContext();
  const { userInfo, setUserInfo, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      checkUserExistOrRegister();
    }
  }, [isAuthenticated, user]);
  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") !== "true") {
      navigate("/");
    }
    const userDetail = sessionStorage.getItem("userDetail");
    const userData = JSON.parse(userDetail ?? "{}");
    setUserInfo?.(userData.userDetail);
    setAuthToken?.(sessionStorage.getItem("authToken") ?? "");
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <HomeTemplate
        header={
          <Header
            avatarSrc={Avatar}
            fetchResults={async () => {
              return [];
            }}
            userId="12345"
            userName={userInfo?.name}
            data-testid="header"
          />
        }
        sideBar={<Sidebar itemid="home" />}
        bodyContent={getContentComponent()}
      />
    </ThemeProvider>
  );
};

export default LandingPage;
