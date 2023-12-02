import React, { ReactNode } from "react";
import { Typography, TypographyProps } from "@mui/material";

interface ITypographyProps extends TypographyProps {
  children: ReactNode;
}
const MuiTypography = ({ children, ...typographyProps }: ITypographyProps) => (
  <Typography {...typographyProps}>{children}</Typography>
);
export default MuiTypography;
