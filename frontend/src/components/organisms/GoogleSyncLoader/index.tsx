import React, { useEffect, useState } from "react";
import { Stack, styled } from "@mui/material";
import theme from "../../../theme";
import Icon from "../../atoms/Icons";
import DriveIcon from "../../../../public/assets/icons/app-logo.svg";
import ProgressBar from "../../atoms/ProgressBar";
import MuiTypography from "../../atoms/Typography";
import { GoogleDriveSyncConstants } from "../../../utils/constants";
import Modal from "../../molecules/Modal/index";
import CloseIcon from "../../../../public/assets/icons/close-white.svg";

export interface SyncProgressMoleculeProps {
  openModal: boolean;
  onClose?: () => void;
}

const CloseIconButton = styled(Icon)({
  cursor: "pointer",
});

const StyledContent = styled(Stack)({
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "376px",
});

const StyledStack = styled(Stack)({
  width: "41vw",
  backgroundColor: theme.palette.grey[400],
});

const SyncProgressMolecule = (props: SyncProgressMoleculeProps) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setModalOpen(props.openModal);
    }, 2000);
  }, [props.openModal]);

  return (
    <Modal open={modalOpen} data-testid="syncProgressModal">
      <StyledStack paddingX={"24px"}>
        <Stack
          direction={"row"}
          paddingTop={"24px"}
          justifyContent={"flex-end"}
        >
          <CloseIconButton
            src={CloseIcon}
            alt="CloseModal"
            onClick={props.onClose}
          />
        </Stack>
        <StyledContent spacing={5}>
          <Stack>
            <Icon src={DriveIcon} alt="drive" width={"86px"} height={"86px"} />
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ProgressBar
              progressVariant="spinner"
              spinnerProps={{
                height: "40px",
                width: "40px",
              }}
            />
            <MuiTypography variant="h3" color={theme.palette.textColor.white}>
              {GoogleDriveSyncConstants.progressText}
            </MuiTypography>
          </Stack>
          <Stack width={"189px"} textAlign={"center"}>
            <MuiTypography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
            >
              {GoogleDriveSyncConstants.closeModalPrompt}
            </MuiTypography>
          </Stack>
        </StyledContent>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"52px"}
        >
          <MuiTypography variant="body2" color={theme.palette.textColor.white}>
            {GoogleDriveSyncConstants.estimatedTime}
          </MuiTypography>
          <MuiTypography variant="body2" color={theme.palette.textColor.white}>
            {GoogleDriveSyncConstants.completed}
          </MuiTypography>
        </Stack>
      </StyledStack>
    </Modal>
  );
};

export default SyncProgressMolecule;
