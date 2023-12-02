import React from "react";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import SuccessIcon from "../../../../public/assets/icons/verified.gif";
import Icon from "../../atoms/Icons";
import MuiButton from "../../atoms/button";
import { resetPasswordSuccessConstants } from "../../../utils/constants";
import { Stack, styled } from "@mui/material";
import { ResetPasswordSucessProps } from "../../../utils/interfaces";
const StyledMuiButton = styled(MuiButton)({
  width: "22.25rem",
  height: "3rem",
  padding: "0.8125rem 0.5rem",
});

const ResetPasswordSuccess = ({handleClick}:ResetPasswordSucessProps) => {
  return (
    <>
      <Stack direction="column">
        <Stack
          direction="row"
          spacing="1rem"
          alignItems="center"
          justifyContent="flex-start"
        >
          <MuiTypography
            variant="h2"
            color={theme.palette.textColor.black}
            children={resetPasswordSuccessConstants.heading}
          />
          <Icon src={SuccessIcon} height="23.4px" />
        </Stack>
        <Stack direction="row" width="13.875rem" marginTop="4px">
          <MuiTypography
            variant="overline1"
            color={theme.palette.textColor.mediumEmphasis}
            children={resetPasswordSuccessConstants.subHeading}
          />
        </Stack>
        <StyledMuiButton variant="contained" onClick={handleClick}>
          <MuiTypography
            variant="body1"
            color={theme.palette.textColor.white}
            children={resetPasswordSuccessConstants.buttonText}
          />
        </StyledMuiButton>
      </Stack>
    </>
  );
};

export default ResetPasswordSuccess;
