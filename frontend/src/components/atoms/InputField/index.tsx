import React from "react";
import { TextField } from "@mui/material";
import { InputFieldProps } from "../../../utils/interfaces";

const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      id={props.id}
      variant={props.variant}
      error={props.error}
      helperText={props.helperText}
      InputProps={props.customInputProps}
      data-testid="InputField"
      {...props}
    />
  );
};

export default InputField;
