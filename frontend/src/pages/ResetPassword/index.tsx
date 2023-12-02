import SignUpTemplate from "../../components/templates/Signup";
import SignUpImage from "../../../public/images/leftContainer.png";
import ResetPassword from "../../components/Organisms/ResetPassword";
import Icon from "../../components/atoms/Icons";
import { useResetPassword } from "./hook";
import CreatePassword from "../../components/organisms/CreatePassword";
import ResetPasswordSuccess from "../../components/molecules/ResetPasswordSuccess";
import { Stack, styled } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const {
    renderState,
    onEmailSetHandler,
    onPasswordSetHandler,
    showInvalidEmail,
  } = useResetPassword();
const navigate = useNavigate();
  const SuccessComponentWrapper = styled(Stack)({
    maxWidth: "35.375rem",
    width: "22.25rem",
    background: theme.palette.structural.background1,
    paddingLeft: "5rem",
    marginTop: "5rem",
  });

  const getRightContent = () => {
    switch (renderState) {
      case "email":
        return (
          <ResetPassword
            onSendHandler={onEmailSetHandler}
            showInvalidEmail={showInvalidEmail}
          />
        );
      case "password":
        return <CreatePassword handleClick={onPasswordSetHandler} />;
      case "success":
        return (
          <SuccessComponentWrapper>
            <ResetPasswordSuccess
              handleClick={() => {
                navigate('/')
              }}
            />
          </SuccessComponentWrapper>
        );
    }
  };

  return (
    <SignUpTemplate
      leftChildren={
        <Stack height={"100%"}>
          <Icon
            src={SignUpImage}
            alt="sign-up-image"
            width={"100%"}
            height={"100%"}
          />
        </Stack>
      }
      rightChildren={getRightContent()}
    />
  );
};

export default ResetPasswordPage;
