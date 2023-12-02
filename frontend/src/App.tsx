import "./styles.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import { AuthContext, useAuthContext } from "./context/authContext";
import {useState } from "react";
import { User} from "./utils/interfaces";
import { FilesPage } from "./pages/FilesPage";
import SearchResultsPage from "./pages/SearchResults";
import ResetPasswordPage from "./pages/ResetPassword";


const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
export const App = () => {
  const [userInfo, setUserInfo] = useState<User|undefined>();
  const [authToken, setAuthToken] = useState<string>("");
  return (

    <>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: 'https://bc116fe.spcluster.tk/home',
        }}
      >
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{userInfo,setUserInfo,authToken,setAuthToken}}>
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/home" element={<LandingPage/>}/>
            <Route path="/viewpdf" element={<SearchResultsPage/>}/>
            <Route path="/files" element={<FilesPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
            </Routes>
          </BrowserRouter>
          </AuthContext.Provider>
        </ThemeProvider>
      </Auth0Provider>
    </>
  );
};
