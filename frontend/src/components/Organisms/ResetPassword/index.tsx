import React from "react";
import theme from "../../../theme";
import InputField from "../../atoms/InputField";
import MuiButton from "../../atoms/button";
import MuiTypography from "../../atoms/Typography";
import { resetPasswordConstants } from "../../../utils/constants";
import { Stack, styled } from "@mui/material";
import { useValidation } from "../SignIn/hook";
import { validateEmail } from "../../../utils/validation";

const ResetPasswordWrapper = styled(Stack)({
  maxWidth: "35.375rem",
  width: "22.25rem",
  paddingLeft: "5rem",
  marginTop: "5rem",
});

const TextFieldWrapper = styled(Stack)({
  gap: "6px",
});

const StyledButton = styled(MuiButton)({
  width: "22.25rem",
  padding: "13px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "4px",
  textTransform: "none",
  background: `${theme.palette.primary[500]}`,
});

export interface ResetPasswordProps {
  onSendHandler?: (email: string) => void;
  showInvalidEmail?: string;
}

const ResetPassword = (props: ResetPasswordProps) => {
  const { onSendHandler, showInvalidEmail } = props;
  const { email, emailHelperText, handleEmailChange } = useValidation();

  return (
    <>
      <ResetPasswordWrapper direction={"column"}>
        <MuiTypography
          color={theme.palette.textColor.black}
          variant="h2"
          children={resetPasswordConstants.headingText}
        />
        <MuiTypography
          width="14.626rem"
          height="2rem"
          marginTop="4px"
          variant="overline1"
          color={theme.palette.textColor.mediumEmphasis}
          children={resetPasswordConstants.subHeadingText}
        />
        <Stack marginTop="2rem">
          <Stack direction="column" spacing="2rem">
            <TextFieldWrapper
              direction="column"
              justifyContent={"center"}
              alignItems="flex-start"
            >
              <MuiTypography
                variant="body1"
                children={resetPasswordConstants.emailText}
                color={theme.palette.textColor.black}
              />
              <InputField
                variant="outlined"
                placeholder={resetPasswordConstants.emailPlaceholderText}
                name="email"
                value={email}
                type="text"
                onChange={handleEmailChange}
                helperText={
                  emailHelperText ? emailHelperText : showInvalidEmail
                }
                error={!!emailHelperText || !!showInvalidEmail}
              />
            </TextFieldWrapper>
            <StyledButton
              variant="contained"
              disabled={!validateEmail(email)}
              onClick={() => {
                onSendHandler?.(email);
              }}
            >
              <MuiTypography
                variant="body1"
                children={resetPasswordConstants.buttonText}
                color={theme.palette.textColor.white}
              />
            </StyledButton>
          </Stack>
        </Stack>
      </ResetPasswordWrapper>
    </>
  );
};

export default ResetPassword;
