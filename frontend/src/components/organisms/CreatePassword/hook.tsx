import { useState } from 'react';
import { passwordError } from '../../../utils/validation';

export const usePasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true)
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(true)
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordHelperText(passwordError(value));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setConfirmPassword(value);
    if (value === password) {
      setConfirmPasswordHelperText("");
    } else {
      setConfirmPasswordHelperText("Passwords do not match");
    }
  };
  const disableCreatePassword = () => {
    return (
      password === "" ||
      confirmPassword === "" ||
      !(passwordHelperText === "" && confirmPasswordHelperText === "")
    );
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return {
    password,
    confirmPassword,
    passwordHelperText,
    confirmPasswordHelperText,
    passwordVisible,
    confirmPasswordVisible,
    handlePasswordChange,
    handleConfirmPasswordChange,
    disableCreatePassword ,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  };
};
