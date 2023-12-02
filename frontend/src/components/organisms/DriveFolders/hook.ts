import { useContext, useState } from "react";
import { DriveFile, DriveFileProps } from "../../../utils/interfaces";
import {
  ACTION_UPDATE,
  ACTION_UPLOAD,
  GoogleDriveSyncConstants,
} from "../../../utils/constants";
import {
  getFileLists,
  postFileData,
  updateFileOnServer,
} from "../../../services/files/api";
import { AuthContext } from "../../../context/authContext";
import { postNotifications } from "../../../services/notifications";
import { FileMetaData } from "../../../utils/dto";

const useDriveFolderLogic = (driveFiles: DriveFileProps["driveFiles"]) => {
  const [open, setOpen] = useState(true);
  const [showFolder, setShowFolder] = useState(true);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<DriveFile>();
  const [uploadedFiles, setUploadedFiles] = useState<FileMetaData[]>([]);
  const [checkedFiles, setCheckedFiles] = useState<{
    [key: string]: boolean;
  }>({});
  const { userInfo, authToken } = useContext(AuthContext);

  const isFolder = (file: DriveFile) =>
    file.mimeType.split(".").pop()?.toLowerCase() === "folder" && !file.trashed;

  const getFolders = () => driveFiles.filter(isFolder);

  const getFiles = (folderId: string) =>
    driveFiles.filter((file) => file.parents?.includes(folderId));

  const handleClickFolder = (folder: DriveFile) => {
    setShowFolder(false);
    setFiles([...getFiles(folder.id)]);
    setSelectedFolder(folder);
  };

  const handleFileUncheck = (fileName: string) => {
    setCheckedFiles((prevCheckedFiles) => {
      const updatedCheckedFiles = { ...prevCheckedFiles };
      delete updatedCheckedFiles[fileName];
      return updatedCheckedFiles;
    });
  };
  const handleFileCheckToggle = (fileName: string, file: any) => {
    setCheckedFiles((prevCheckedFiles) => ({
      ...prevCheckedFiles,
      [fileName]: !prevCheckedFiles[fileName],
    }));
    const fileUpload: FileMetaData = {
      fileId: file.id,
      fileName: file.name,
      fileType: "pdf",
      trashed: file.trashed,
      synced: false,
    };
    setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, fileUpload]);
  };
  const handleBack = () => {
    setShowFolder(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const folderHeading = showFolder
    ? GoogleDriveSyncConstants.addFiles
    : selectedFolder?.name;

  const handleSyncFiles = async () => {
    if (uploadedFiles.length === 0) {
      handleClose();
      return;
    }

    try {
      const response = await getFileLists(authToken);
      const responseArray: FileMetaData[] = await response.data.files;
      handleClose();
      for (const uploadedFile of uploadedFiles) {
        const existingFile = responseArray.find(
          (item) => uploadedFile.fileName === item.fileName
        );
        uploadedFile.userId = userInfo?.id;

        if (existingFile) {
          await updateFileOnServer(
            existingFile,
            existingFile.fileId,
            authToken
          );
          await postNotifications(
            userInfo?.id,
            existingFile.fileId,
            ACTION_UPDATE,
            authToken
          );

        } else {
          await postFileData(uploadedFile, authToken);
          await postNotifications(
            userInfo?.id,
            uploadedFile.fileId,
            ACTION_UPLOAD,
            authToken
          );
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error syncing files:", error);
    }
  };

  return {
    open,
    showFolder,
    files,
    folderHeading,
    getFolders,
    handleClickFolder,
    handleBack,
    handleClose,
    checkedFiles,
    handleFileUncheck,
    handleFileCheckToggle,
    handleSyncFiles,
  };
};

export default useDriveFolderLogic;
