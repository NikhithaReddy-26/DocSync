import { useContext, useState } from "react";
import {
  getFileLists,
  postLocalFile,
  updateLocalFile,
} from "../../../services/files/api";
import { postNotifications } from "../../../services/notifications";
import { AuthContext } from "../../../context/authContext";
import { ACTION_UPDATE, ACTION_UPLOAD } from "../../../utils/constants";
import { FileMetaData } from "../../../utils/dto";

export function useUploadModal() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Uploads");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadInitiated, setUploadInitiated] = useState(false);
  const [showUploadLoader, setShowUploadLoader] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File>();

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { userInfo, authToken } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTab("Uploads");
    setSelectedFiles([]);
    setOpen(false);
    setUploadInitiated(false);
  };

  const handleTabChange = (newTab: React.SetStateAction<string>) => {
    setSelectedTab(newTab);
  };

  const handleLeftArrowClick = () => {
    setSelectedTab("Uploads");
    setSelectedFiles([]);
  };


  const onDrop = (acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(
      (file: { type: string }) => file.type === "application/pdf"
    );
    setSelectedFiles(pdfFiles);
  };
  const navigateToAnotherComponent = () => {
    handleUploadFiles(selectedFiles);
    handleClose();
  };
  const handleUploadFiles = async (files: File[]) => {
    try {
      const existingFilesResponse = await getFileLists(authToken);
      if (existingFilesResponse.status !== 200) {
        console.error(
          "getFileLists failed with status code:",
          existingFilesResponse.status
        );
        return;
      } else {
        console.log("existing files: ", existingFilesResponse.data.files);
      }
      const existingFiles: FileMetaData[] = await existingFilesResponse.data
        .files;

      for (const file of files) {
        const isMatchingFile = existingFiles.find(
          (existingFile) => existingFile.fileName === file.name
        );

        if (isMatchingFile) {
          setShowUpdateModal(true);
          setUploadedFile(file);
        } else {
          setShowUploadLoader(true);
          setUploadedFile(file);
          const metadata: FileMetaData = {};
          metadata.userId = userInfo?.id;
          const uploadedFile = await postLocalFile(file, metadata, authToken);
          await postNotifications(
            userInfo?.id,
            uploadedFile.id,
            ACTION_UPLOAD,
            authToken
          );
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error in uploading the file :", error);
    }
  };
  const handleUpdateFile = async (file?: File) => {
    try {
      const response = await getFileLists(authToken);
      if (response.status !== 200) {
        console.error("getFileLists failed with status code:", response.status);
        return;
      }
      const existedFiles: FileMetaData[] = await response.data.files;

      if (file) {
        const existedFile = existedFiles.find((f) => f.fileName === file.name);

        if (existedFile) {
          setShowUpdateModal(false);
          setShowUploadLoader(true);
          const fileId = existedFile.fileId;
          const metadata: FileMetaData = {};
          metadata.userId = userInfo?.id;
          await updateLocalFile(file, fileId, metadata, authToken);
          await postNotifications(
            userInfo?.id,
            fileId,
            ACTION_UPDATE,
            authToken
          );
          window.location.reload();
        } else {
          console.error("File not found in the list.");
        }
      } else {
        console.error("Invalid file data: 'file' is undefined.");
      }
    } catch (error) {
      console.error("Error in updating the file :", error);
    }
  };

  return {
    open,
    selectedTab,
    selectedFiles,
    uploadInitiated,
    handleOpen,
    handleClose,
    handleTabChange,
    handleLeftArrowClick,
    onDrop,
    handleUploadFiles,
    showUploadLoader,
    uploadedFile,
    showUpdateModal,
    handleUpdateFile,
    navigateToAnotherComponent,
  };
}
