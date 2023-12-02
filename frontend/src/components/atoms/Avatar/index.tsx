import MuiAvatar from "@mui/material/Avatar";
import React from "react";
import { AvatarProps } from "../../../utils/interfaces";

const Avatar = (props: AvatarProps) => {
  return <MuiAvatar {...props} data-testid="avatar" />;
};

export default Avatar;
