import React from "react";
import theme from "../../../theme";
import MuiTypography from "../../atoms/Typography";
import InputField from "../../atoms/InputField";
import MuiButton from "../../atoms/button";
import EyeIcon from "../../../../public/assets/icons/hide.svg";
import HideIcon from "../../../../public/assets/icons/unhide.svg";
import { CreatePasswordProps } from "../../../utils/interfaces";
import { Stack, styled } from "@mui/material";
import { usePasswordValidation } from "./hook";
import { createPasswordConstants } from "../../../utils/constants";
import Icon from "../../atoms/Icons";

const CreatePasswordWrapper = styled(Stack)({
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
});

const CreatePassword = ({ handleClick }: CreatePasswordProps) => {
  const {
    password,
    confirmPassword,
    passwordHelperText,
    confirmPasswordHelperText,
    passwordVisible,
    confirmPasswordVisible,
    handlePasswordChange,
    handleConfirmPasswordChange,
    disableCreatePassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = usePasswordValidation();

  return (
    <>
      <CreatePasswordWrapper direction={"column"}>
        <Stack>
          <MuiTypography
            color={theme.palette.textColor.black}
            variant="h2"
            children={createPasswordConstants.heading}
          />
          <MuiTypography
            width="14.626rem"
            height="2rem"
            marginTop="4px"
            variant="overline1"
            color={theme.palette.textColor.mediumEmphasis}
            children={createPasswordConstants.subHeading}
          />
        </Stack>
        <Stack marginTop="2rem">
          <Stack direction="column" spacing="2rem">
            <TextFieldWrapper
              direction="column"
              justifyContent={"center"}
              alignItems="flex-start"
              data-testid="create-password"
            >
              <MuiTypography
                variant="body1"
                children={createPasswordConstants.newPasswordText}
                color={theme.palette.textColor.black}
              />
              <InputField
                variant="outlined"
                name="password"
                value={password}
                type={passwordVisible ? "password" : "text"}
                placeholder={
                  createPasswordConstants.newPasswordPlaceeholderText
                }
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
            <TextFieldWrapper
              direction="column"
              justifyContent={"center"}
              alignItems="flex-start"
            >
              <MuiTypography
                variant="body1"
                children={createPasswordConstants.confirmPasswordText}
                color={theme.palette.textColor.black}
              />
              <InputField
                variant="outlined"
                placeholder={
                  createPasswordConstants.confirmPasswordPlaceholdertext
                }
                name="confirmPassword"
                value={confirmPassword}
                type={confirmPasswordVisible ? "password" : "text"}
                onChange={handleConfirmPasswordChange}
                helperText={confirmPasswordHelperText}
                error={!!confirmPasswordHelperText}
                customInputProps={{
                  endAdornment: (
                    <Icon
                      onClick={toggleConfirmPasswordVisibility}
                      src={confirmPasswordVisible ? EyeIcon : HideIcon}
                      alt="eye-icon"
                    />
                  ),
                  style: { cursor: "default" },
                }}
              />
            </TextFieldWrapper>
            <StyledButton
              variant="contained"
              disabled={disableCreatePassword()}
              onClick={() => {
                handleClick?.(password);
              }}
            >
              <MuiTypography
                variant="body1"
                children={createPasswordConstants.buttonText}
                color={theme.palette.textColor.white}
              />
            </StyledButton>
          </Stack>
        </Stack>
      </CreatePasswordWrapper>
    </>
  );
};

export default CreatePassword;
