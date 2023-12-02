import { useContext, useState } from "react";
import {
  emailError,
  nameError,
  passwordError,
  validateEmail,
  validatePassword,
} from "../../../utils/validation";
import { login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { User, UserCredentials } from "../../../utils/interfaces";
import { AuthContext } from "../../../context/authContext";
export const useValidation = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameHelperText, setNameHelperText] = useState<string>("");
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");
  const [signInHelperText, setSignInHelperText] = useState<string>("");
  const Navigate = useNavigate();
  const { setUserInfo, setAuthToken } = useContext(AuthContext);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailHelperText(emailError(value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordHelperText(passwordError(value));
  };
  const validateForm = (email: string, password: string, name?: string) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    return (
      email === "" ||
      password === "" ||
      !isEmailValid ||
      !isPasswordValid ||
      name === ""
    );
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
    setNameHelperText(nameError(value));
  };
  const handleSignIn = async () => {
    try {
      const res=await login(email,password);
      setAuthToken?.(res.token.token);
      sessionStorage.setItem('authToken',res.token.token);
      const UserDetail:User={
        email:res.user.email,
        name:`${res.user.firstName} ${res.user.lastName}`,
        id:res.user.id
      }
      setUserInfo?.(UserDetail);
      const data={userDetail:UserDetail}
      sessionStorage.setItem('userDetail', JSON.stringify(data));
      Navigate("/home")
    } catch (err) {
      setSignInHelperText("Invalid Credentials");
    }
  };

  return {
    name,
    email,
    password,
    emailHelperText,
    passwordHelperText,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
    handleNameChange,
    nameHelperText,
    handleSignIn,
    signInHelperText,
  };
};
