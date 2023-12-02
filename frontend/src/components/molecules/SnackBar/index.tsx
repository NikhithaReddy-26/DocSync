import React from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Icon from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typography";
import { Stack } from "@mui/material";
import CloseIcon from "./../../../../public/assets/icons/close-white.svg";
import CompleteIcon from "./../../../../public/assets/icons/complete.svg";

export interface MuiSnackBarProps extends SnackbarProps {
  message?: string;
  width?: string;
  onClickHandler?: () => void;
  onCloseHandler?: () => void;
  isOpen: boolean;
}

const MuiSnackbar: React.FC<MuiSnackBarProps> = (props) => {
  const { message, width, onCloseHandler, onClickHandler, isOpen, ...rest } =
    props;

  return (
    <Snackbar
      data-testid="snackbar"
      open={isOpen}
      onClose={onCloseHandler}
      autoHideDuration={3000}
      sx={{
        "& .MuiSnackbarContent-root": {
          minWidth: "fit-content",
        },
        position: "absolute",
      }}
      message={
        <Stack
          direction="row"
          width={width}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            sx={{
              cursor: "pointer",
            }}
            direction="row"
            spacing={3}
            alignItems="center"
            justifyContent="center"
            onClick={onClickHandler}
          >
            <Icon
              src={CompleteIcon}
              alt="complete-icon"
              height="20px"
              width="20px"
            />
            <MuiTypography children={message} variant="body1" />
          </Stack>
          <Stack>
            <Icon src={CloseIcon} alt="close-icon" onClick={onCloseHandler} />
          </Stack>
        </Stack>
      }
      {...rest}
    />
  );
};

export default MuiSnackbar;
