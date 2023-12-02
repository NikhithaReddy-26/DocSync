import { Stack, styled } from "@mui/material";
import React from "react";
import Avatar from "../../atoms/Avatar";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import { NotificationProps } from "../../../utils/interfaces";

const StyledStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  padding: "12px",
  gap: "12px",
});

const StyledTextStack = styled(Stack)({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
});

const Notification = (props: NotificationProps) => {
  return (
    <StyledStack>
      <Stack>
        <Avatar src={props.avatarSrc} alt={props.avatarAlt} />
      </Stack>
      <StyledTextStack>
        <Stack>
          <MuiTypography
            variant="body2"
            color={theme.palette.textColor.lowEmphasis}
          >
            {props.notificationMessage}
          </MuiTypography>
        </Stack>
        <Stack>
          <MuiTypography
            variant="caption1"
            color={theme.palette.textColor.lowEmphasis}
          >
            {props.time}
          </MuiTypography>
        </Stack>
      </StyledTextStack>
    </StyledStack>
  );
};

export default Notification;
