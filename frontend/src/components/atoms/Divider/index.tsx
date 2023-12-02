import { Divider } from "@mui/material";
import React from "react";
import { CustomDividerProps } from "../../../utils/interfaces";

const CustomDivider = ({ children, orientation }: CustomDividerProps) => {
  return (
    <Divider data-testid="Divider" orientation={orientation}>
      {children}
    </Divider>
  );
};

export default CustomDivider;
