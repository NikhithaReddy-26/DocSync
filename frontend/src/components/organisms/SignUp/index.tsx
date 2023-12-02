import React from "react";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import InputField from "../../atoms/InputField";
import MuiButton from "../../atoms/button";
import CustomDivider from "../../atoms/Divider";
import GoogleLogo from "../../../../public/assets/icons/google.svg";
import HideIcon from "../../../../public/assets/icons/unhide.svg";
import EyeIcon from "../../../../public/assets/icons/hide.svg";
import { Stack, styled } from "@mui/material";
import { signInConstants, signUpConstants } from "../../../utils/constants";
import { useValidation } from "../../Organisms/SignIn/hook";
import { usePasswordValidation } from "../CreatePassword/hook";
import Icon from "../../atoms/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const SignUpWrapper = styled(Stack)({
  maxWidth: "35.375rem",
  width: "22.25rem",
});

const TextFieldWrapper = styled(Stack)({
  gap: "6px",
  width: "22.25rem",
});
const StyledButton = styled(MuiButton)({
  width: "22.25rem",
  padding: "13px 8px",
});
const StyledGoogleSignUp = styled(MuiButton)({
  padding: "11px 10px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "4px",
  background: `${theme.palette.structural.structuralBg}`,
  textTransform: "none",
});
export interface SignUpProps{
  handleSignUp?:(email: string, password: string, name: string)=>void;
}
const SignUp = ({handleSignUp}:SignUpProps) => {
  const {
    name,
    email,
    password,
    emailHelperText,
    passwordHelperText,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    handleNameChange,
    nameHelperText,
  } = useValidation();
  const { passwordVisible, togglePasswordVisibility } = usePasswordValidation();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  return (
    <>
      <SignUpWrapper direction="column" spacing={3.5}>
        <Stack top="0.1rem">
          <MuiTypography
            color={theme.palette.textColor.black}
            variant="h2"
            children={signInConstants.signUpText}
            marginBottom={"2rem"}
          />
        </Stack>
        <TextFieldWrapper>
          <MuiTypography
            variant="body1"
            children={signUpConstants.name}
            color={theme.palette.textColor.black}
          />
          <InputField
            variant="outlined"
            placeholder={signUpConstants.namePlaceholderText}
            name="name"
            value={name}
            type="text"
            onChange={handleNameChange}
            helperText={nameHelperText}
            error={!!nameHelperText}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <MuiTypography
            variant="body1"
            children={signInConstants.emailText}
            color={theme.palette.textColor.black}
          />
          <InputField
            variant="outlined"
            placeholder={signInConstants.emailPlaceholderText}
            name="email"
            value={email}
            type="text"
            onChange={handleEmailChange}
            helperText={emailHelperText}
            error={!!emailHelperText}
          />
        </TextFieldWrapper>
        <TextFieldWrapper marginTop="20px">
          <MuiTypography
            variant="body1"
            children={signInConstants.passwordText}
            color={theme.palette.textColor.black}
          />
          <InputField
            variant="outlined"
            placeholder={signInConstants.passwordPlaceholderText}
            value={password}
            onChange={handlePasswordChange}
            type={passwordVisible ? "password" : "text"}
            helperText={passwordHelperText}
            error={!!passwordHelperText}
            customInputProps={{
              endAdornment: (
                <Icon
                  onClick={togglePasswordVisibility}
                  src={passwordVisible ? EyeIcon : HideIcon}
                  alt="eye-icon"
                />
              ),
              style: { cursor: "default" },
            }}
          />
        </TextFieldWrapper>
        <StyledButton
        
          variant="contained"
          disabled={validateForm(email, password, name)}
          data-testid="signInButton"
          onClick={() => handleSignUp?.(email, password, name)}
        >
          <MuiTypography
            variant="body1"
            color={theme.palette.textColor.white}
            children={signUpConstants.createAccountText}
          />
        </StyledButton>
        <Stack marginTop="28px">
          <Stack spacing="28px" direction="column" width={"22.25rem"}>
            <CustomDivider orientation="horizontal">
              <MuiTypography
                marginLeft={"1.1875rem"}
                marginRight={"1.1875rem"}
                variant="caption1"
                color={theme.palette.textColor.mediumEmphasis}
              >
                {signInConstants.dividerText}
              </MuiTypography>
            </CustomDivider>
            <StyledGoogleSignUp
            data-testid="google-login"
              iconProps={{
                width: "26px",
                height: "26px",
                src: GoogleLogo,
                alt: "googleIcon",
              }}
              variant="text"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              <MuiTypography
                variant="body1"
                color={theme.palette.textColor.black}
              >
                {signInConstants.googleText}
              </MuiTypography>
            </StyledGoogleSignUp>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <MuiTypography
                variant="caption1"
                children={signUpConstants.hasAccountText}
                color={theme.palette.textColor.mediumEmphasis}
              />
              <MuiTypography
                variant="caption1"
                children={signInConstants.signInText}
                color={theme.palette.primary[500]}
                marginLeft={"2px"}
                sx={{
                  cursor:"pointer"
                }}
                onClick={()=>navigate("/" )}
              />
            </Stack>
          </Stack>
        </Stack>
      </SignUpWrapper>
    </>
  );
};

export default SignUp;
