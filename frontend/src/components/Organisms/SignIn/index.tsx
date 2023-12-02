import React from "react";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import InputField from "../../atoms/InputField";
import CustomCheckBox from "../../atoms/Checkbox";
import MuiButton from "../../atoms/button";
import CustomDivider from "../../atoms/Divider";
import GoogleIcon from "../../../../public/assets/icons/google.svg";
import { Stack, styled } from "@mui/material";
import { signInConstants } from "../../../utils/constants";
import { useValidation } from "./hook";
import { usePasswordValidation } from "../../organisms/CreatePassword/hook";
import Icon from "../../atoms/Icons";
import HideIcon from "../../../../public/assets/icons/unhide.svg";
import EyeIcon from "../../../../public/assets/icons/hide.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const SignInWrapper = styled(Stack)({
  maxWidth: "35.375rem",
  width: "22.25rem",
  paddingLeft: "5rem",
});

const TextFieldWrapper = styled(Stack)({
  gap: "6px",
});
const StyledButton = styled(MuiButton)({
  width: "22.25rem",
  padding: "13px 8px",
});
const StyledGoogleButton = styled(MuiButton)({
  padding: "11px 10px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  borderRadius: "4px",
  background: `${theme.palette.structural.structuralBg}`,
  textTransform: "none",
});

const SignIn = () => {
  const {
    email,
    password,
    emailHelperText,
    passwordHelperText,
    signInHelperText,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    handleSignIn,
  } = useValidation();
  const { passwordVisible, togglePasswordVisibility } = usePasswordValidation();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    sessionStorage.setItem("isAuthenticated", "true");
    loginWithRedirect();
  };

  return (
      <SignInWrapper direction="column">
        <MuiTypography
          color={theme.palette.textColor.black}
          variant="h2"
          children={signInConstants.signInText}
          marginBottom={"2rem"}
        />
        <TextFieldWrapper
          direction="column"
          justifyContent={"center"}
          alignItems="flex-start"
        >
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
        <TextFieldWrapper
          direction="column"
          justifyContent={"center"}
          alignItems="flex-start"
          marginTop="20px"
        >
          <MuiTypography
            variant="body1"
            children={signInConstants.passwordText}
            color={theme.palette.textColor.black}
          />
          <InputField
            variant="outlined"
            placeholder={signInConstants.passwordPlaceholderText}
            value={password}
            type={passwordVisible ? "password" : "text"}
            onChange={handlePasswordChange}
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
        <Stack
          direction="row"
          marginTop="8px"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <CustomCheckBox sx={{ paddingLeft: "0" }} disabled />
            <MuiTypography
              children={signInConstants.rememberMeText}
              variant="caption1"
              color={theme.palette.textColor.lowEmphasis}
            />
          </Stack>
          <MuiTypography
            children={signInConstants.forgotPasswordText}
            variant="caption1"
            color={theme.palette.primary[500]}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/reset-password")}
          />
        </Stack>
        <StyledButton
          variant="contained"
          disabled={validateForm(email, password)}
          data-testid="signInButton"
          onClick={handleSignIn}
        >
          <MuiTypography
            variant="body1"
            color={theme.palette.textColor.white}
            children={signInConstants.signInText}
          />
        </StyledButton>
        {signInHelperText && (
          <MuiTypography
            variant="caption"
            color="red"
            children={signInHelperText}
          />
        )}
        <Stack marginTop="28px">
          <Stack spacing="28px" direction="column">
            <CustomDivider orientation="horizontal" variant="middle">
              <MuiTypography
                variant="caption1"
                color={theme.palette.textColor.mediumEmphasis}
                children={signInConstants.dividerText}
                marginLeft={"1.1875rem"}
                marginRight={"1.1875rem"}
              />
            </CustomDivider>
            <StyledGoogleButton
              data-testid="google-login"
              variant="text"
              iconProps={{
                src: GoogleIcon,
                alt: "google-icon",
                height: "26px",
                width: "26px",
              }}
              onClick={loginWithGoogle}
            >
              <MuiTypography
                variant="body1"
                color={theme.palette.textColor.black}
                children={signInConstants.googleText}
              />
            </StyledGoogleButton>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <MuiTypography
                variant="caption1"
                children={signInConstants.noAccountText}
                color={theme.palette.textColor.mediumEmphasis}
              />
              <MuiTypography
                variant="caption1"
                children={signInConstants.signUpText}
                color={theme.palette.primary[500]}
                marginLeft={"2px"}
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              />
            </Stack>
          </Stack>
        </Stack>
      </SignInWrapper>
  
  );
};

export default SignIn;
