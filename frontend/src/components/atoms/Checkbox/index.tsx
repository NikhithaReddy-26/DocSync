import React from "react";
import { Checkbox, CheckboxProps } from "@mui/material";

interface CustomCheckBoxInterfaceProps extends CheckboxProps {}

const CustomCheckBox = ({ ...checkBoxProps }: CustomCheckBoxInterfaceProps) => {
  return (
    <>
      <Checkbox {...checkBoxProps} />
    </>
  );
};

export default CustomCheckBox;
