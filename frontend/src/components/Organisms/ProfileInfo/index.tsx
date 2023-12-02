import React from "react";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typography";
import Icon from "../../atoms/Icons";
import { userOptions } from "../../../utils/constants";
import { Box, Stack, styled } from "@mui/material";

const StyledBox = styled(Box)({
  height: "10.375rem",
  width: "11.1875rem",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[100]}`,
  background: `${theme.palette.textColor.white}`,
  boxShadow: `4px 16px 32px 0px rgba(213, 206, 221, 0.70)`,
});

const UserProfileWrapper = styled(Stack)({
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "4px 12px",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
});

const UserDetailsWrapper = styled(Box)({
  display: "flex",
  padding: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.875rem",
  cursor: "pointer",
});

interface ProfileInfoProps {
  username?: string;
  userId?: string;
  handleLogout?: () => void;
}

const ProfileInfo = ({ username, userId, handleLogout }: ProfileInfoProps) => {
  return (
    <>
      <StyledBox zIndex={"1"} data-testid="logout-box">
        <UserProfileWrapper direction="column">
          <MuiTypography
            variant="body1"
            color={theme.palette.textColor.black}
            children={username}
          />
          <MuiTypography
            variant="overline1"
            color={theme.palette.textColor.lowEmphasis}
            children={userId}
          />
        </UserProfileWrapper>
        <UserDetailsWrapper data-testid="profile-options">
          {userOptions.map((item, index) => {
            return (
              <Stack
                key={item.text}
                direction="row"
                spacing={2}
                onClick={() => index === 2 && handleLogout?.()}
              >
                <Icon src={item.src} alt={item.alt} height="24px" width="24px" />
                <MuiTypography
                  variant="body2"
                  color={theme.palette.textColor.black}
                  children={item.text}
                  data-testid={item.text}
                />
              </Stack>
            );
          })}
        </UserDetailsWrapper>
      </StyledBox>
    </>
  );
};

export default ProfileInfo;
