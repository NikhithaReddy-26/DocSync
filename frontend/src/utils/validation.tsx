import { emailErrorMessage, nameErrorMessage, passwordErrorMessage } from "./constants";

const emailRegex = /^[^\s@]+@(zemosolabs\.com|gmail\.com)$/;
const passwordValidator = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};
export const validatePassword = (password: string) => {
  return passwordValidator.test(password);
};
export const nameError = (name: string) =>{
  return name?'':nameErrorMessage
}
export const emailError = (email: string) =>{
  return validateEmail(email)?'':emailErrorMessage
}
export const passwordError = (password: string) =>{
  if(password.length<=7){
    return passwordErrorMessage[1]
  }
  return validatePassword(password)?'':passwordErrorMessage[0]
}
