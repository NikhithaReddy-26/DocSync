import React from "react";
import SignUpTemplate from "../../components/templates/Signup";
import leftContainer from "../../../public/images/leftContainer.png";
import Image from "../../components/atoms/Image";
import SignIn from "../../components/Organisms/SignIn";
import { Stack } from "@mui/material";
const SignInPage = () => {
  return (
    <>
      <SignUpTemplate
        leftChildren={<Image src={leftContainer} />}
        rightChildren={
          <Stack
            marginTop="5rem"
            justifyContent="center"
            data-testid="signIn-component"
          >
            <SignIn />
          </Stack>
        }
      />
    </>
  );
};

export default SignInPage;
