import {
  DividerProps,
  LinearProgressProps,
  InputProps,
  TextFieldVariants,
  TextFieldProps,
} from "@mui/material";
import { IconProps } from "../components/atoms/Icons";
import React from "react";

export interface AvatarProps {
  src: string;
  alt: string;
  onClick?: () => void;
}
export interface CustomDividerProps extends DividerProps {
  children?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}
export interface InputFieldProps extends Omit<TextFieldProps, "variant"> {
  id?: string;
  variant?: TextFieldVariants;
  required?: boolean;
  customInputProps?: InputProps;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

export interface FileInfoProps {
  fileImageSrc?: string;
  fileImageAlt?: string;
  iconSrc?: string;
  iconAlt?: string;
  fileName?: string;
}

export interface ProgressBarInterfaceProps {
  loaderProps?: LoaderProps;
  spinnerProps?: IconProps;
  notificationProps?: IconProps;
  progressVariant?: string;
}
export interface LoaderProps extends LinearProgressProps {}

export interface NotificationProps {
  avatarSrc: string;
  avatarAlt: string;
  notificationMessage: React.ReactNode;
  time?: string;
}
export interface IconTypoProps {
  iconProps?: IconProps;
  text?: React.ReactNode;
  showCheckBox?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface MuiTabsProps {
  variant?: "standard" | "scrollable" | "fullWidth";
  tabNames: string[];
  sxProps?: any;
  backgroundColor?: string;
  notSelectedColor?: string;
  borderBottom?: string;
  isTabDisabled?: boolean;
  onSelectTab: (tabName: string) => void;
  selectedTab: string;
  tabWidth?: string;
  activeTabColor?: string;
}

export type CalendarProps = {
  label: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

export interface MenuItemProps {
  [key: string]: string;
}
export interface NotificationBoxProps {
  read?: boolean;
  showNotifications?: boolean;
  handleCloseNotifications: () => void;
  handleShowNotifications: () => void;
  notifications: Notification[];
}

export interface ResetPasswordSucessProps {
  handleClick?: () => void;
}
export interface CreatePasswordProps {
  handleClick?: (password: string) => void;
}

export interface DriveFileProps {
  driveFiles: DriveFile[];
}

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  kind?: string;
  webViewLink: string;
  parents?: string[];
  trashed: boolean;
  isChecked?: boolean;
  content?: string;
  path?: string;
  isSync?: boolean;
  createdOn?: Date;
  updatedOn?: Date;
};

export interface FileObject {
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}

export interface UserCredentials {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

// interface for notification api response
export interface NotificationDto {
  notificationId?: string;
  usrId: string;
  createdBy?: string;
  action: string;
  fileId?: string;
  createdOn: Date;
  read: boolean;
}

// interface for notification box props
export interface Notification {
  id?: string;
  avatar: string;
  userName: string;
  message: string;
  time: string;
  isRead: boolean;
}

// interface for user api response
export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdOn: Date;
  updatedOn: Date;
}

// interface for file api response
export interface FileDto {
  fileId: string;
  fileName: string;
  path: string;
  type: string;
  createdOn: Date;
  updatedOn: Date;
}

export interface Folder {
  trashed: boolean;
  name: string;
  id: string;
  files: File[];
}

export interface File {
  id?: string;
  name: string;
  trashed: boolean;
  parents: string;
}

export interface LocalFile {
  id?: string;
  name: string;
  type: string;
  content?: string;
  path?: string;
  createdOn?: Date;
  lastModifiedDate?: Date;
  updatedOn?: Date;
}
