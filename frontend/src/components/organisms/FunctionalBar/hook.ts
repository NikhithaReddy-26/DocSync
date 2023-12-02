import { useState } from "react";

export const useFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileType, setFileType] = useState<string>("");
  const [publishSetting, setPublishSetting] = useState<string>("");
  const handleStartDateSelect = (date: any) => {
    setStartDate(date);
  };
  const handleEndDateSelect = (date: any) => {
    setEndDate(date);
  };
  const handleDropdownChange = (
    value: string,
    setDropdownValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setDropdownValue(value);
  };

  return {
    startDate,
    endDate,
    fileType,
    publishSetting,
    setFileType,
    setPublishSetting,
    handleStartDateSelect,
    handleEndDateSelect,
    handleDropdownChange,
  };
};
