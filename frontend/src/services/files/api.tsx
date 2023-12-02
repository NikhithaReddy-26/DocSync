import axios from "axios";
import api from "../api";
import api2 from "./axios"
import { FileMetaData } from "../../utils/dto";

export async function fetchFiles(authToken?:string) {
  api.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const response = await api.get(`/files`);
    const currentDate = new Date();
    const fifteenDaysAgo = new Date(currentDate);
    fifteenDaysAgo.setDate(currentDate.getDate() - 15);


    const filteredFiles = response.data.files.filter(
      (file: { createdOn: string | number | Date }) => {
        const fileDate = new Date(file.createdOn);
        return fileDate >= fifteenDaysAgo && fileDate <= currentDate;
      }
    );
    const sortedFilesDescending = filteredFiles.sort(
      (
        a: { createdOn: string | number | Date },
        b: { createdOn: string | number | Date }
      ) => {
        return (
          new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
      }
    );

    return sortedFilesDescending;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch files. Please try again.");
  }
}
  // TODO: need to check this after post notification
export const getFilesByIds = async (fileIds: string[],authToken?:string) => {
  api.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  const query = fileIds.map((id) => `${id}`).join(",");
  try {
    const files = await api.get(
      `/files?${query}`
    );
    return files.data.files;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

export const getFileLists = async (authToken?:string) => {
  api.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const response = await api.get(`/files`);
    return response;
  } catch (error) {
    console.error("Error fetching file lists:", error);
    throw error;
  }
};

export const postFileData = async (data: FileMetaData,authToken?:string) => {
  api2.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const formData=new FormData();
    formData.append('metadata',JSON.stringify(data))
    const response = await api2.post(
      `/files`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error posting file data:", error);
    throw error;
  }
};

export const postLocalFile = async (data: File,metadata?:FileMetaData,authToken?:string) => {
  api2.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const formData = new FormData();
    formData.append('file',data);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    const response = await api2.post(
      `/files`,formData
    );
    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const updateLocalFile = async (file:File,fileId?:string,metadata?:FileMetaData,authToken?:string) => {
  api2.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const formData = new FormData();
    formData.append('file',file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    const response = await api2.post(
      `/files/${fileId}`,formData
    );
    console.log(`File with id: ${fileId} updated successfully:`, response.data);
    return response;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};


export const deleteFilesByIds = async (fileIds: string[],authToken?:string) => {
  api.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const response = await api.delete(
      `/files/fileIds?fileIds=${fileIds}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error while deleting file with ID ${fileIds}:`, error);
    throw error;
  }
};

export const updateFileOnServer = async (fileData: FileMetaData,fileId?:string,authToken?:string) => {
  api2.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const formData=new FormData();
    formData.append('metadata',JSON.stringify(fileData))
    const response = await api2.post(
      `/files/${fileId}`,
      formData
    );

    if (response.status === 200) {
      console.log(`File "${fileData.fileName}" updated successfully.`);
      return true;
    } else {
      console.error(
        `Error updating file "${fileData.fileName}": Unexpected response status ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error(`Error updating file "${fileData.fileName}":`, error);
    return false;
  }
};

export const fetchAllFiles = async (authToken?:string) => {
  api.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
  try {
    const response = await api.get(`/files`);
    return response.data.files.map((file: { fileName: any; filePath: any }) => ({
      ...file,
      fileName: file.fileName,
      path: file.filePath,
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
