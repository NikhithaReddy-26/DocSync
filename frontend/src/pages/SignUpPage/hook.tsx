import {  registerUser } from "../../services/auth";
import { UserRequest } from "../../utils/dto";

import { useNavigate } from "react-router-dom";
export const useSignUp = () => {
  const Navigate = useNavigate();
  const handleSignUp = (email: string, password: string, name: string) => {
    const newUser: UserRequest = {
      firstName :name.substring(0, name.indexOf(" " )),
      lastName :name.substring(name.indexOf(" ")),
      email: email,
      password: password,
      avatarUrl:"null",
    };
    registerUser(newUser).then(()=>{Navigate("/")}).catch((err)=>{
      alert("User already present, please login")
    });
  };
  return { handleSignUp };
};
