
import React from "react";
import Icon  from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typography";
import theme from "../../../theme";
import CustomCheckBox from "../../atoms/Checkbox";
import checkedIcon from "../../../../public/assets/icons/checkedIcon.svg";
import { IconTypoProps } from "../../../utils/interfaces";
import { Stack } from "@mui/material";

const IconTypo = ({
  iconProps,
  text,
  showCheckBox,
  checked,
  onChange,
}: IconTypoProps) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={"1rem"}    
      >
        {showCheckBox && (
          <CustomCheckBox
          data-testid="checkbox" 
            checked={checked}
            onChange={onChange}
            checkedIcon={<Icon src={checkedIcon} />}
            style={{
              color: `${theme.palette.textColor.white}`,
            }}
          />
        )}
        <Icon {...iconProps} data-testid="icon" />
        <MuiTypography
          variant="body1"
          color={theme.palette.textColor.white}
          children={text}
        />
      </Stack>
    </>
  );
};

export default IconTypo;
