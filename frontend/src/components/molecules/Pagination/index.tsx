import { Stack} from "@mui/material";
import React from "react";
import MuiTypography from "../../atoms/Typography";
import Icon from "../../atoms/Icons";
import MinusIcon from "./../../../../public/assets/icons/minus-white.svg";
import AddIcon from "./../../../../public/assets/icons/add.svg";
import theme from "../../../theme";

export interface PaginationProps {
  zoomValue?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  currentPage?: number;
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, zoomValue, onZoomIn, onZoomOut } = props;
  const content = `Page ${currentPage} of ${totalPages}`;
  const zoomText = `${zoomValue}%`;
  return (
    <Stack
      data-testid="pagination"
      direction="row"
      height="3.25rem"
      width="19.69rem"
      sx={{ background: theme.palette.grey[400], borderRadius: "0.5rem" }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Stack>
        <MuiTypography
          variant="body1"
          children={content}
          color={theme.palette.textColor.white}
        />
      </Stack>
      <Stack
        direction="row"
        height="2.25rem"
        width="7.625rem"
        sx={{ background: theme.palette.grey[300], borderRadius: "0.625rem" }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Icon src={MinusIcon} onClick={onZoomOut} alt="minus-icon" style={{cursor:'pointer'}} />
        <MuiTypography
          variant="body1"
          children={zoomText}
          color={theme.palette.textColor.white}
          
        />
        <Icon src={AddIcon} onClick={onZoomIn} style={{cursor:'pointer'}} alt="add-icon" />
      </Stack>
    </Stack>
  );
};

Pagination.defaultProps = {
  zoomValue: 100,
  currentPage: 0,
  totalPages: 0,
};

export default Pagination;
