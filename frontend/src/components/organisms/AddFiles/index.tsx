import React, { useEffect, useState } from "react";
import { UploadModal } from "../UploadModal";
import useGapi from "./hook";
import SyncProgressMolecule from "../GoogleSyncLoader";
import DriveFolders from "../DriveFolders";

const AddFiles = () => {
  const { handleSync, allDriveFiles, showFiles, sync } = useGapi();

  return (
    <>
      {!sync && <UploadModal onGoogleDriveClick={handleSync} />}
      {sync && !showFiles && <SyncProgressMolecule openModal={sync} />}
      {showFiles && <DriveFolders driveFiles={allDriveFiles} />}
    </>
  );
};
export default AddFiles;
