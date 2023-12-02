import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider, styled } from "@mui/material";
import CloseIcon from "../../../../public/assets/icons/close.svg";
import DownArrow from "../../../../public/assets/icons/down-arrow.svg";
import theme from "../../../theme";
import { filefound } from "../../../utils/constants";
import MuiTypography from "../../atoms/Typography";
import { MenuItemProps } from "../../../utils/interfaces";

const StyledSelect = styled(Select)(({ value, theme }) => ({
  backgroundColor: value
    ? theme.palette.primary[100]
    : theme.palette.structural.background1,
  border:
    value === ""
      ? `1px solid ${theme.palette.grey[100]}`
      : `1px solid ${theme.palette.primary[100]}`,
}));

export type SelectLabelsProps = {
  menuItems: MenuItemProps;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void | undefined;
};
const CustomDropdown: React.FC<SelectLabelsProps> = ({
  menuItems,
  placeholder,
  label,
  value,
  onChange,
}) => {
  const handleReset = () => {
    onChange("");
  };
  const renderIcon = () => {
    return value !== "" ? (
      <img
        src={CloseIcon}
        alt={filefound.CLOSE_NOT_FOUND}
        style={{ cursor: "pointer" }}
        onClick={handleReset}
        data-testid="close-icon"
      />
    ) : (
      <img
        src={DownArrow}
        alt={filefound.NOT_FOUND}
        style={{ cursor: "pointer" }}
        onClick={handleReset}
        data-testid="down-arrow"
      />
    );
  };

  const paperStyle = {
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.textColor.white,
    width: "259px",
    marginTop: "8px",
  };

  return (
    <div>
      <FormControl>
        <StyledSelect
          value={value}
          displayEmpty
          data-testid="select"
          onChange={(event) => onChange(event.target.value as string)}
          onOpen={() => {}}
          onClose={() => {}}
          MenuProps={{
            PaperProps: {
              style: paperStyle,
            },
          }}
          IconComponent={() => renderIcon()}
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            <MuiTypography variant="body1" children={placeholder} />
          </MenuItem>
          <MenuItem style={{ pointerEvents: "none" }}>
            <MuiTypography variant="body1" children={label} />
          </MenuItem>
          <Divider
            sx={{ backgroundColor: theme.palette.textColor.lowEmphasis }}
          />
          {Object.entries(menuItems).map(([key, value]) => (
            <MenuItem
              key={key}
              value={key}
              sx={{ color: theme.palette.textColor.highEmphasis }}
            >
              <MuiTypography variant="caption1" children={<MuiTypography variant="body1" children={value}/>} />
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
};

export default CustomDropdown;
