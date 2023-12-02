import React from "react";
import theme from "../../../theme";
import { Stack, styled } from "@mui/material";
interface SignUpProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
}
const SignUpContainer = styled("div")({
  height: "100vh",
  background: `${theme.palette.textColor.white}`,
  flexDirection: "row",
  flexWrap: "wrap",
  display: "flex",
  justifyContent: "flex-start",
  gap: "30px",
  margin: 0,
  overflow: "hidden",
});
const LeftContainer = styled(Stack)({
  width: "100%",
  maxWidth: "59.2%",
  height: "100vh",
});
const RightContainer = styled(Stack)({
  display: "flex",
  alignItems: "center",
  maxWidth: "40.8%",
});
const SignUpTemplate = ({ leftChildren, rightChildren }: SignUpProps) => {
  return (
    <>
      <SignUpContainer>
        <LeftContainer>{leftChildren}</LeftContainer>
        <RightContainer>{rightChildren}</RightContainer>
      </SignUpContainer>
    </>
  );
};

export default SignUpTemplate;
