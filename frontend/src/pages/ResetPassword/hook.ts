import { useState } from "react";
import { updatePassword, validateEmail } from "../../services/auth";
import { resetPasswordConstants } from "../../utils/constants";

export const useResetPassword = () => {
  const [showInvalidEmail, setShowInvalidEmail] = useState("");
  const [renderState, setRenderState] = useState<
    "email" | "password" | "success"
  >("email");

  const [email, setEmail] = useState<string>("");

  const onEmailSetHandler = async (email: string) => {
    const isValid = await validateEmail(email);
    if (!isValid) {
      setShowInvalidEmail(resetPasswordConstants.userNotExist);
    } else {
      setEmail(email);
      setRenderState("password");
    }
  };

  const onPasswordSetHandler = async (updatedPassword: string) => {
    await updatePassword(email, updatedPassword);
    setRenderState("success");
  };

  return {
    showInvalidEmail,
    renderState,
    setRenderState,
    onEmailSetHandler,
    onPasswordSetHandler,
  };
};
