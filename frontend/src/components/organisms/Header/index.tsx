import { Stack, styled } from "@mui/material";
import MuiTypography from "../../atoms/Typography";
import HeaderBackground from "../../../../public/images/header-background.svg";
import Icon from "../../atoms/Icons";
import HelpIcon from "../../../../public/assets/icons/help.svg";
import NotificationBox from "../Notification";
import Avatar from "../../atoms/Avatar";
import AddUserIcon from "../../../../public/assets/icons/add-user.svg";
import SearchByKeyword, { SearchKeywordResult } from "../SearchKeyword";
import ProfileInfo from "../../Organisms/ProfileInfo";
import { useHeader, useNotification } from "./hook";
import downArrow from "../../../../public/assets/icons/down-white.svg";
import MuiButton from "../../atoms/button";
import { useEffect, useContext, SetStateAction } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../../../context/authContext";

export interface HeaderProps {
  fetchResults: (keyword: string) => Promise<SearchKeywordResult[]>;
  avatarSrc: string;
  userName?: string;
  userId: string;
  handleSearchResultChange?: (keyword: string) => void;
  setFilePath?: React.Dispatch<SetStateAction<string | undefined>>;
  setFileName?: React.Dispatch<SetStateAction<string | undefined>>;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {
    fetchResults,
    avatarSrc,
    userName,
    userId,
    handleSearchResultChange,
    setFilePath,
    setFileName,
  } = props;
  const { logout } = useAuth0();
  const { showProfileInfo, onAvatarClickHandler, onAvatarBlur } = useHeader();
  const { setUserInfo, setAuthToken, userInfo, authToken } =
    useContext(AuthContext);
  const handleLogout = () => {
    setUserInfo?.(undefined);
    setAuthToken?.("");
    sessionStorage.clear();
    logout();
  };

  const {
    read,
    handleCloseNotifications,
    showNotifications,
    handleShowNotifications,
    notifications,
    fetchNotifications,
  } = useNotification(userInfo?.id, authToken);

  useEffect(() => {
    console.log("from header: ", authToken, userInfo);
    if (authToken && userInfo) fetchNotifications();
  }, [authToken, userInfo]);

  const StyledIconStack = styled(Stack)({
    height: "2.75rem",
    width: "2.75rem",
    alignItems: "center",
    justifyContent: "space-around",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "0.375rem",
    boxSizing: "border-box",
  });

  const StyledAvatarStack = styled(Stack)({
    height: "2.74rem",
    width: "5.375rem",
    borderRadius: "0.5rem",
    position: "relative",
    background: "rgba(255,255,255,0.4)",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "space-evenly",
  });

  const displayAvatar = () => {
    return (
      <Stack position={"relative"}>
        <Avatar src={avatarSrc} alt="avatar-icon" />
      </Stack>
    );
  };

  const displayAvatarWithProfileInfo = () => {
    return (
      <StyledAvatarStack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={2}
        >
          <Avatar src={avatarSrc} alt="avatar-icon" />
          <Icon src={downArrow} alt="down-arrow-icon" />
        </Stack>
        <Stack position={"absolute"} top={"3rem"} right={"0.05rem"}>
          <ProfileInfo
            userId={userId}
            username={userName}
            handleLogout={handleLogout}
          />
        </Stack>
      </StyledAvatarStack>
    );
  };

  return (
    <Stack
      data-testid="header"
      direction="row"
      height="3.75rem"
      justifyContent="space-between"
      alignItems="center"
      boxSizing="border-box"
      sx={{
        background: `url(${HeaderBackground})`,
        backgroundSize: "cover",
      }}
    >
      <Stack paddingLeft="1.25rem" boxSizing="border-box">
        <MuiTypography variant="h3" children="CONTIQ" color="white" />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        boxSizing="border-box"
        minWidth="37.5rem"
        justifyContent="space-between"
        marginRight="1.25rem"
        spacing={"1.25rem"}
      >
        <Stack height="2.75" width="22rem">
          <SearchByKeyword
            fetchResult={fetchResults}
            handleSearchResultChange={handleSearchResultChange}
            setFilePath={setFilePath}
            setFileName={setFileName}
          />
        </Stack>
        <StyledIconStack>
          <Icon src={HelpIcon} alt="help-icon" height="24px" width="24px" />
        </StyledIconStack>
        <StyledIconStack>
          <Icon
            src={AddUserIcon}
            alt="add-user-icon"
            height="24px"
            width="24px"
          />
        </StyledIconStack>
        <MuiButton
          variant="text"
          onClick={handleShowNotifications}
          onBlur={handleCloseNotifications}
          disableRipple
          children={
            <StyledIconStack direction="row" paddingRight="6px">
              <NotificationBox
                notifications={notifications}
                read={read}
                handleCloseNotifications={handleCloseNotifications}
                showNotifications={showNotifications}
                handleShowNotifications={handleShowNotifications}
              />
            </StyledIconStack>
          }
        />
        <MuiButton
          data-testid="avatarButton"
          variant="text"
          onClick={onAvatarClickHandler}
          onFocus={onAvatarClickHandler}
          onBlur={onAvatarBlur}
          disableRipple
          children={
            showProfileInfo ? displayAvatarWithProfileInfo() : displayAvatar()
          }
        />
      </Stack>
    </Stack>
  );
};

export default Header;
