import Profile from "../../public/assets/icons/user.svg";
import Setting from "../../public/assets/icons/settings.svg";
import Logout from "../../public/assets/icons/logout.svg";

import office from "../../public/assets/icons/home-icon.svg";
import homeglow from "../../public/assets/icons/home-glow.svg";
import metrics from "../../public/assets/icons/metrics-icon.svg";
import files from "../../public/assets/icons/file-icon.svg";
import calendar from "../../public/assets/icons/calendar-icon.svg";
import people from "../../public/assets/icons/people-icon.svg";
import settings from "../../public/assets/icons/settings.svg";
import fileglow from "../../public/assets/icons/files-glow.svg";
import home from "../../public/assets/icons/glowvector.svg";
import googledrive from "../../public/assets/icons/app-logo.svg";
import dropbox from "../../public/assets/icons/dropbox.svg";
import terabox from "../../public/assets/icons/terabox.svg";
import pdfIcon from "../../public/assets/icons/pdf.svg";
import upload from "../../public/assets/icons/upload-icon.svg";
import cloudStorageIcon from "../../public/assets/icons/googledrive-icon.svg";
import closeIcon from "../../public/assets/icons/close-white.svg";
import add from "../../public/assets/icons/add.svg";
import leftArrow from "../../public/assets/icons/leftarrow-white.svg";

export const navBarSvgs = {
  home: home,
  office: office,
  calendar: calendar,
  people: people,
  files: files,
  metrics: metrics,
  settings: settings,
  homeglow: homeglow,
  officeglow: office,
  calendarglow: calendar,
  peopleglow: people,
  filesglow: fileglow,
};
export const modalSvgs = {
  googledrive: googledrive,
  dropbox: dropbox,
  terabox: terabox,
  pdfIcon: pdfIcon,
  cloudStorageIcon: cloudStorageIcon,
  upload: upload,
  closeIcon: closeIcon,
  add: add,
  leftArrow: leftArrow,
};

import Amit from "../../public/assets/icons/avatar.svg";
import John from "../../public/assets/icons/john.svg";
import theme from "../theme";
import { File } from "../components/organisms/FileBody/hook";

export const NoFileInfoContent = {
  heading: "No Files Available",
  subHeading: "Start by syncing your cloud storage to contiq",
};

export const userOptions = [
  {
    src: Profile,
    text: "Profile",
    alt:"Profile"
  },
  {
    src: Setting,
    text: "Settings",
    alt: "Settings",
  },
  {
    src: Logout,
    text: "Logout",
    alt: "Logout",
  },
];
export const Notifications = [
  {
    id: "1",
    avatar: Amit,
    userName: "Amit",
    message: " has uploaded company agreement.pdf",
    time: "20 June 10:30 AM",
    isRead: false,
  },
  {
    id: "2",
    avatar: Amit,
    userName: "Amit",
    message: " has uploaded company profile.pdf",
    time: "10 June 10:50 PM",
    isRead: false,
  },
  {
    id: "3",
    avatar: Amit,
    userName: "Amit",
    message: " has uploaded company agreement.pdf",
    time: "20 June 10:30 AM",
    isRead: false,
  },
  {
    id: "4",
    avatar: John,
    userName: "John",
    message: " request access to User agreement.pdf",
    time: "03 June 09:30 AM",
    isRead: false,
  },
  {
    id: "5",
    avatar: Amit,
    userName: "Amit",
    message: " has uploaded company agreement.pdf",
    time: "02 June 12:30 PM",
    isRead: false,
  },
  {
    id: "6",
    avatar: Amit,
    userName: "Amit",
    message: " deleted company agreement.pdf",
    time: "01 June 09:30 AM",
    isRead: false,
  },
];

export const DAYS_OF_WEEK = new Map([
  ["Su", "SUN"],
  ["Mo", "MON"],
  ["Tu", "TUE"],
  ["We", "WED"],
  ["Th", "THU"],
  ["Fr", "FRI"],
  ["Sa", "SAT"],
]);

export const START_DATE = "2023-08-24";
export const DAY = "day";

export const nameErrorMessage = "Name should not be empty";
export const emailErrorMessage = "Please enter a valid email address";
export const passwordErrorMessage = [
  "password must contain one Uppercase letter,one special character",
  "it should be greater than 7 characters",
];
export const signInConstants = {
  signInText: "Sign In",
  emailText: "Email ID",
  emailPlaceholderText: "john@example.com",
  passwordPlaceholderText: "Create a password",
  passwordText: "Password",
  rememberMeText: "Remember me",
  forgotPasswordText: "Forgot password?",
  dividerText: "OR",
  googleText: "Continue with Google",
  noAccountText: "Doesn’t have an account?",
  signUpText: "Sign Up",
};
export const resetPasswordConstants = {
  emailPlaceholderText: "john@example.com",
  emailText: "Email",
  headingText: "Reset your password",
  subHeadingText:
    "The verification mail will be sent to the mailbox please check it.",
  buttonText: "Send",
  userNotExist: "User does not exist",
};

export const sidebarContent = {
  home: "Home",
  office: "Office",
  calendar: "Calendar",
  people: "People",
  Files: "Files",
  Metrics: "Metrics",
};
export const resetPasswordSuccessConstants = {
  heading: "Password Reset",
  subHeading:
    "Your password has been successfully reset. Click below to login magically.",
  buttonText: "Continue",
};

export const NotificationBoxTitle = "Notifications";

export const signUpConstants = {
  name: "Name",
  namePlaceholderText: "John Cena",
  hasAccountText: "Already have an account?",
  createAccountText: "Create Account",
};

export const filefound = {
  CLOSE_NOT_FOUND: "not found close image",
  NOT_FOUND: "Not found",
};

export const searchKeywordResults = [
  {
    id: 1,
    file: "Company Agreement.pdf",
    searchResults: [
      {
        id: 1,
        fileName: "Company Agreement",
        description: "hello there looking for words",
        foundOn: 1,
        totalSlide: 3,
      },
    ],
  },
  {
    id: 2,
    file: "Software Agreement 2.pdf",
    searchResults: [
      {
        id: 1,
        fileName: "Company Agreement",
        description: "hello there looking for words",
        foundOn: 1,
        totalSlide: 3,
      },
    ],
  },
  {
    id: 3,
    file: "Software Agreements 3.pdf",
    searchResults: [
      {
        id: 1,
        fileName: "Company Agreement",
        description: "hello there looking for words",
        foundOn: 1,
        totalSlide: 3,
      },
    ],
  },
];

export const createPasswordConstants = {
  heading: "Create new Password",
  subHeading: "Enter new password below to change your password",
  newPasswordText: "New password",
  confirmPasswordText: "Confirm New password",
  newPasswordPlaceeholderText: "Enter the Password",
  buttonText: "Reset Password",
  confirmPasswordPlaceholdertext: "Re-enter your password",
};

export const dropdownsConfig = [
  {
    placeholder: "File type",
    label: "File type",
    menuItems: {
      option1: "PDF",
      option2: "PPT",
      option3: "Image",
    },
  },
  {
    placeholder: "Publish Setting",
    label: "Published By",
    menuItems: {
      option1: "Published by me",
      option2: "Published by Sales team",
      option3: "Published by others",
    },
  },
];
export const updateModalData = {
  cancel: "Cancel",
  upload: "Upload",
  header: "Upload Options",
  content:
    " already exists in this location. Do you want to replace the existing file with a new version or keep both files?",
};

export const CustomPdfViewerStyles = `:root{ 

          --document-background-color: ${theme.palette.structural.background1} ; 
          --panel-background: ${theme.palette.structural.background1} ;
          --focus-border: ${theme.palette.primary[500]} 
        }
        ::-webkit-scrollbar-track { 
          background-color: ${theme.palette.structural.structuralBg};
        }
        .Thumbnail .page-label {
          display:none
        }
        .LeftPanel .left-panel-header {
          margin: 0 !important;
        }
        .left-panel-container {
          width: 100%;
          padding: 0 !important;
        }
        .Thumbnail .page-image {
          height: 190px !important;
          width: 140px !important;
        }`;

export const GoogleDriveSyncConstants = {
  progressText: "Sync in progress",
  closeModalPrompt: "Closing this window will not interrupt your sync",
  estimatedTime: "Estimated time - 10 mins",
  completed: "Completed 1/2",
  addFiles: "Add Files",
  folderHeading: "Choose the folders to sync with contiq",
  syncOption1: "Sync entire drive",
  syncOption2: "Sync folders",
};

export const SyncedDriveFiles = [
  {
    id: 1,
    folderName: "Zemoso decks",
    files: [
      {
        id: 1,
        name: "Company overview",
      },
      {
        id: 2,
        name: "Software aggreement",
      },
      {
        id: 3,
        name: "Sample data",
      },
      {
        id: 4,
        name: "Sample data",
      },
    ],
  },
  {
    id: 2,
    folderName: "Sample data",
    files: [
      {
        id: 1,
        name: "Sample File 1",
      },
      {
        id: 2,
        name: "Sample File 2",
      },
      {
        id: 3,
        name: "Sample File 3",
      },
      {
        id: 4,
        name: "Sample File 4",
      },
    ],
  },
  {
    id: 3,
    folderName: "Sample data",
    files: [
      {
        id: 1,
        name: "Sample File 1",
      },
      {
        id: 2,
        name: "Sample File 2",
      },
      {
        id: 3,
        name: "Sample File 3",
      },
      {
        id: 4,
        name: "Sample File 4",
      },
    ],
  },
];

export const fileBodyFiles: File[] = [
  {
    id: 1,
    fileName: "Company agreement.pdf",
    thumbnail: "",
    createdOn: new Date(),
    updatedOn: new Date(),
    name: "Company agreement.pdf",
    path: "/document/agreemt.pdf",
    type: "pdf",
  },
  {
    id: 2,
    fileName: "Company profile.pdf",
    thumbnail: "",
    createdOn: new Date(),
    updatedOn: new Date(),
    name: "Company agreement.pdf",
    path: "/document/agreemt.pdf",
    type: "pdf",
  },
  {
    id: 3,
    fileName: "Company profile.pdf",
    thumbnail: "",
    createdOn: new Date(),
    updatedOn: new Date(),
    name: "Company profile.pdf",
    path: "/document/company.pdf",
    type: "pdf",
  },
];

export const DRIVE_FILES = [
  {
    id: "1",
    name: "Zemoso decks",
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.folder",
    modifiedTime: "2023-06-27T09:30:44.000Z",
    parents: ["1oq8vTvekWaEbxXozpdTdA41GxNdrA43u"],
    trashed: false,
    webViewLink: "",
  },
  {
    id: "2",
    name: "Sample data",
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.folder",
    modifiedTime: "2023-06-27T09:30:44.000Z",
    parents: ["1oq8vTvekWaEbxXozpdTdA41GxNdrA43u"],
    trashed: false,
    webViewLink: "",
  },
  {
    id: "3",
    name: "Zemoso data",
    kind: "drive#file",
    mimeType: "application/vnd.google-apps.folder",
    modifiedTime: "2023-06-27T09:30:44.000Z",
    parents: ["1oq8vTvekWaEbxXozpdTdA41GxNdrA43u"],
    trashed: false,
    webViewLink: "",
  },
  {
    id: "4",
    name: "Zemoso decks",
    kind: "drive#file",
    mimeType: "application/pdf",
    modifiedTime: "2023-06-27T09:30:44.000Z",
    parents: ["1"],
    trashed: false,
    webViewLink: "",
  },
  {
    id: "5",
    name: "Zemoso decks",
    kind: "drive#file",
    mimeType: "application/pdf",
    modifiedTime: "2023-06-27T09:30:44.000Z",
    parents: ["1"],
    trashed: false,
    webViewLink: "",
  },
];

export const uploadmodalData = {
  addFiles: " Add Files",
  uploadFiles: " Upload Files",
  uploadfilesTab: "Uploads",
  cloudStorageTab: "Cloud Storage",
  dropfiles: " Drop your files here",
  uploadFileButton: "Upload File",
  chooseFileButton: "Choose files",
  dragmedia: "Drag media here to upload or",
  connectAnAccount: "connect an account",
};

export const HAS_UPLOADED = "has uploaded";
export const HAVE_UPLOADED = "have uploaded";
export const HAS_UPDATED = "has updated";
export const HAVE_UPDATED = "have updated";
export const HAS_DELETED = "has deleted";
export const HAVE_DELETED = "have deleted";
export const ACTION_UPLOAD = "Uploaded";
export const ACTION_UPDATE = "Updated";
export const ACTION_DELETE = "Deleted";

export const passwordConstant = "Test@1234";
export const REACT_APP_GAPI_CLIENT_ID =
  "583028719334-3a6aabc655cj3utlh6rrrtvushbibnc1.apps.googleusercontent.com";
export const REACT_APP_GAPI_API_KEY = "AIzaSyC3D4kE0_RkM3_gWuqP5fhKulbg985WKBw";
export const REACT_APP_GAPI_SCOPE =
  "https://www.googleapis.com/auth/drive.metadata.readonly";
export const REACT_APP_GAPI_DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

export const FILE_RESOURCE_URL =
  "https://bc116be.spcluster.tk/api/v1/files/resource?filepath=";

export const SUCCESS_CODE = 200;
