import React from "react";
import Image from "../../atoms/Image";
import FileNotFoundSrc from "../../../../public/images/File-not-found.svg";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import {NoFileInfoContent} from "../../../utils/constants";
import { Stack } from "@mui/material";

const NoFileInfo = () => {
  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Image src={FileNotFoundSrc} />
        <MuiTypography
          variant="subtitle1"
          children={NoFileInfoContent.heading}
          marginTop={"12.33px"}
          color={theme.palette.textColor.black}
        />
        <MuiTypography
          variant="body2"
          children={NoFileInfoContent.subHeading}
          color={theme.palette.textColor.lowEmphasis}
        />
      </Stack>
    </>
  );
};

export default NoFileInfo;
