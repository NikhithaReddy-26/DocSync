import { useEffect, useState } from "react";
import { OnFilterChangeType } from "../FunctionalBar";

export interface File {
  id: number;
  fileName: string;
  thumbnail?: string;
  createdOn: Date;
  type: string;
  path: string;
  name: string;
  updatedOn: Date;

}

export interface FilterParams {
  fileType: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  publishSetting: string;
}

export const useFileBody = (fetchFiles: () => Promise<File[]>) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    fileType: "",
    startDate: null,
    endDate: null,
    publishSetting: "",
  });
  const handleFilterChange: OnFilterChangeType = (params) => {
    setFilterParams({ ...params });
  };
  useEffect(() => {
    const { startDate, endDate } = filterParams;
    if (startDate && endDate) {
      setFiles(filterFiles(startDate, endDate));
    } else {
      getFiles(fetchFiles);
    }
  }, [filterParams.startDate, filterParams.endDate]);

  const getFiles = async (fetchFiles: () => Promise<File[]>) => {
    try {
      if (fetchFiles) {
        const fetchedFiles = await fetchFiles();
        setFiles(fetchedFiles);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const filterFiles = (startDate: Date | string, endDate: Date | string) => {
    return files.filter((file) => {
      const fileDate = new Date(file.createdOn);
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() - 1);
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 2);
      return startDateObj <= fileDate && fileDate <= endDateObj;
    });
  };

  return { files, handleFilterChange };
};
