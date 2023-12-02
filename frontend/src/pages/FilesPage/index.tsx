import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import HomeTemplate from "../../components/templates/Home";
import Header from "../../components/organisms/Header";
import Sidebar from "../../components/Organisms/Navbar";
import FileBody from "../../components/organisms/FileBody";
import { fetchAllFiles } from "../../services/files/api";
import Avatar from "../../../public/assets/icons/avatar.svg";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
export const FilesPage = () => {
  const { setUserInfo, setAuthToken, authToken, userInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
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
    <ThemeProvider theme={theme}>
      <HomeTemplate
        header={
          <Header
            avatarSrc={Avatar}
            fetchResults={async () => {
              return Promise.resolve([]);
            }}
            userId="12345"
            userName={userInfo?.name}
          />
        }
        sideBar={<Sidebar itemid="files" />}
        bodyContent={<FileBody fetchFiles={() => fetchAllFiles(authToken)} />}
      />
    </ThemeProvider>
  );
};
