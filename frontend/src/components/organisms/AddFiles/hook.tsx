import React, { useContext, useEffect, useState } from "react";
import {
  ACTION_DELETE,
  REACT_APP_GAPI_API_KEY,
  REACT_APP_GAPI_CLIENT_ID,
  REACT_APP_GAPI_DISCOVERY_DOCS,
  REACT_APP_GAPI_SCOPE,
} from "../../../utils/constants";
import { DriveFile, File } from "../../../utils/interfaces";
import { gapi } from "gapi-script";
import { deleteFilesByIds } from "../../../services/files/api";
import { postNotifications } from "../../../services/notifications";
import { AuthContext } from "../../../context/authContext";

const useGapi = () => {
  const [allDriveFiles, setAllDriveFiles] = useState<DriveFile[]>([]);
  const [trashedFiles, setTrashedFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState(false);
  const [sync, setSync] = useState(false);
  const { userInfo,authToken } = useContext(AuthContext);

  const initClient = () => {
    console.log("Initializing client...");
    gapi.client
      .init({
        apiKey: REACT_APP_GAPI_API_KEY,
        clientId: REACT_APP_GAPI_CLIENT_ID,
        discoveryDocs: REACT_APP_GAPI_DISCOVERY_DOCS,
        scope: REACT_APP_GAPI_SCOPE,
      })
      .then(
        (data: any) => {
          console.log("Client initialized successfully.");
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        (error: any) => console.log("Error initializing client:", error)
      );
  };
  const updateSigninStatus = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      listFiles();
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  const filterTrashedFiles = (data: File[] | undefined) => {
    return data ? data.filter((folder) => folder.trashed) : ([] as File[]);
  };

  const listFiles = (searchTerm = null) => {
    gapi.client.drive.files
      .list({
        fields:
          "nextPageToken, files(id, name, mimeType, modifiedTime, kind, webViewLink, webContentLink, parents, trashed)",
        q: searchTerm,
      })
      .then((response: any) => {
        const res = JSON.parse(response.body);
        setAllDriveFiles(res.files);
        const trashedFilesList = filterTrashedFiles(res.files);

        setTrashedFiles(trashedFilesList);
        deleteTrashedFiles(trashedFiles);
      })
      .catch((error: any) => {
        console.log("error showing files", error);
      });
  };
  const deleteTrashedFiles = async (filesToDelete: File[]) => {
    const fileIds = filesToDelete
    .map((file) => file.id)
    .filter((id): id is string => id !== undefined);
    try {
      await deleteFilesByIds(fileIds,authToken)
    } catch (error) {
      console.error("Error deleting trashed files:", error);
    }
  };

  const gapiLoad = () => {
    gapi.load("client:auth2", initClient);
  };
  useEffect(() => {
    deleteTrashedFiles(trashedFiles);
  }, [trashedFiles]);
  useEffect(() => {
    if (allDriveFiles.length > 0) {
      setShowFiles(true);
    }
  }, [allDriveFiles]);
  const handleSync = () => {
    setSync(true);
    gapiLoad();
  };
  return {
    gapiLoad,
    allDriveFiles,
    trashedFiles,
    deleteTrashedFiles,
    filterTrashedFiles,
    showFiles,
    sync,
    handleSync,
  };
};

export default useGapi;
