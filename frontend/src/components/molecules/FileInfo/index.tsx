import { Stack, styled } from "@mui/material";
import React from "react";
import Image from "../../atoms/Image";
import Icon from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import { FileInfoProps } from "../../../utils/interfaces";

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  width: "17.35%",
  height: "30%",
  gap: theme.spacing(3),
}));
const StyledImageContainer = styled(Stack)(({ theme }) => ({
  padding: "5%",
  backgroundColor: theme.palette.structural.structuralBg,
  borderRadius: "8px",
}));

const StyledImage = styled(Image)({
  width: "100%",
  height: "100%",
});

const FileInfo = (props: FileInfoProps) => {
  const getFileName = (fileName?: string) => {
    if (fileName && fileName.length > 20) {
      return fileName.slice(0, 20).concat("...pdf");
    } else {
      return fileName;
    }
  };

  return (
    <StyledStack>
      <StyledImageContainer>
        <StyledImage src={props.fileImageSrc} alt={props.fileImageAlt} />
      </StyledImageContainer>
      <Stack direction="row" spacing={theme.spacing(3)}>
        <Icon src={props.iconSrc} alt={props.iconAlt} />
        <MuiTypography variant="body1" color={theme.palette.textColor.black}>
          {getFileName(props?.fileName)}
        </MuiTypography>
      </Stack>
    </StyledStack>
  );
};

export default FileInfo;
