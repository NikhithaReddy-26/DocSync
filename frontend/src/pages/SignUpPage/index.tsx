import React from "react";
import SignUpTemplate from "../../components/templates/Signup";
import leftContainer from "../../../public/images/leftContainer.png";
import SignUp from "../../components/organisms/SignUp";
import Image from "../../components/atoms/Image";
import { Stack } from "@mui/material";
import { useSignUp } from "./hook";

const SignUpPage = () => {
  const { handleSignUp } = useSignUp();

  return (
    <>
      <SignUpTemplate
        leftChildren={
          <Image src={leftContainer} data-testid="image-component" />
        }
        rightChildren={
          <Stack
            marginTop="5rem"
            justifyContent="center"
            marginLeft="5rem"
            data-testid="signUp-component"
          >
            <SignUp handleSignUp={handleSignUp} />
          </Stack>
        }
      />
    </>
  );
};

export default SignUpPage;
