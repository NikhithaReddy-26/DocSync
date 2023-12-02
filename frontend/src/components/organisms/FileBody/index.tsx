import React from "react";
import { Divider, Grid, Stack } from "@mui/material";
import MuiTypography from "../../atoms/Typography";
import MuiTabs from "../../molecules/Tabs";
import PdfIcon from "../../../../public/assets/icons/pdf.svg";
import DummyFileImage from "../../../../public/images/image.svg";
import { File, useFileBody } from "./hook";
import FunctionalBar from "../FunctionalBar";
import AddFiles from "../AddFiles";
import FileInfo from "../../molecules/FileInfo";

export interface FileBodyProps {
  onAddFile?: () => void;
  fetchFiles: () => Promise<File[]>;
}
const tabs = ["All files", "Slides", "Docs"];
const FileBody = (props: FileBodyProps) => {
  const { fetchFiles } = props;
  const { handleFilterChange, files } = useFileBody(fetchFiles);

  return (
    <Stack paddingX={"1.5rem"} data-testid="fileBody">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        paddingY={"1.75rem"}
        height={"5.75rem"}
        boxSizing={"border-box"}
      >
        <MuiTypography children="Files" variant="h2" />
        <AddFiles />
      </Stack>
      <Stack paddingY={"0.75rem"}>
        <FunctionalBar onFilterChange={handleFilterChange} />
      </Stack>
      <Stack>
        <MuiTabs tabNames={tabs} selectedTab={tabs[0]} onSelectTab={() => {}} />
        <Divider flexItem />
      </Stack>
      <Grid container gap="20px" paddingTop="30px" data-testid="resultGrid">
        {files.map((file) => (
          <FileInfo
            key={file.id}
            fileName={file.fileName}
            fileImageSrc={DummyFileImage}
            iconSrc={PdfIcon}
            data-testid="file-info"
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default FileBody;
