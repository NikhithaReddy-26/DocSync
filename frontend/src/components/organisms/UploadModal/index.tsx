import React from "react";
import {Button,Box,DialogTitle,DialogContent,Stack,styled} from "@mui/material";
import theme from "../../../theme";
import Icon from "../../atoms/Icons";
import MuiTypography from "../../atoms/Typography";
import MuiTabs from "../../molecules/Tabs";
import MuiButton from "../../atoms/button";
import { modalSvgs, uploadmodalData } from "../../../utils/constants";
import Modal from "../../molecules/Modal";
import { useUploadModal } from "./hooks";
import { useDropzone } from "react-dropzone";
import { FileObject } from "../../../utils/interfaces";
import { UploadLoader } from "../UploadLoader";
import UpdateModal from "../UpdateModal";

const StyledDivider = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`;

const InnerBox = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 414px;
  width: 648px;
  background: ${theme.palette.grey[400]};
  border-width: 2px;
  border-style: dashed;
  border-color: ${theme.palette.grey[200]};
  max-width: 700px;
  border-image: repeating-linear-gradient(
      45deg,
      grey,
      grey 13px,
      transparent 13px,
      transparent 20px
    )
    1;
    border-radius: 10px;
`;
interface UploadModalProps {
  onGoogleDriveClick?: () => void;
}

export const UploadModal = ({onGoogleDriveClick}:UploadModalProps)=> {
  const {
    open,
    selectedTab,
    selectedFiles,
    handleOpen,
    handleClose,
    handleTabChange,
    handleLeftArrowClick,
    onDrop,
    navigateToAnotherComponent,
    handleUpdateFile,
    showUploadLoader,
    uploadedFile,
    showUpdateModal
  } = useUploadModal();

  
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        <Icon src={modalSvgs.add} /> {uploadmodalData.addFiles}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          data-testid="upload-modal"
          bgcolor={theme.palette.grey[400]}
          borderRadius={theme.spacing(1)}
          width="696px"
          height="598px"
        >
          <DialogTitle>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Box style={{ display: "flex", alignItems: "center", gap: "20px", }} padding={"10px 0 0 25px"}>
                <Icon src={modalSvgs.leftArrow} data-testid="left-arrow-icon" onClick={() => { handleLeftArrowClick()}}
                  style={{ cursor: "pointer" }}/>
                <MuiTypography variant="h3" color={theme.palette.structural.background1}>
                  {uploadmodalData.uploadFiles}
                </MuiTypography>
              </Box>
              <Box style={{ marginLeft: "auto", cursor: "pointer" }} paddingRight={"20px"}>
                <Icon src={modalSvgs.closeIcon} onClick={handleClose} alt="close" data-testid="close"/>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ padding: 0 }}>
            <StyledDivider />
            <MuiTabs tabNames={[uploadmodalData.uploadfilesTab, uploadmodalData.cloudStorageTab]} onSelectTab={handleTabChange} selectedTab={selectedTab} activeTabColor="white"
            tabWidth="348px" />
            <StyledDivider />
            <CenteredBox>
              {selectedTab === uploadmodalData.uploadfilesTab && (
                <InnerBox>
                  <Stack direction={"column"} alignItems={"center"} spacing={8} >
                    <Stack direction={"column"} alignItems={"center"} spacing={3} >
                      {selectedFiles.length > 0 ? (
                        <Icon src={modalSvgs.pdfIcon} height={"80px"} width={"80px"} />
                      ) : (
                        <Icon src={modalSvgs.upload} height={"30px"} width={"30px"} />
                      )}
                      <MuiTypography variant="body1" color={theme.palette.structural.background1} data-testid="selected-files">
                        {selectedFiles.length > 0 ? (
                          selectedFiles.map((file: FileObject, index: React.Key | null | undefined) => (
                            <Box key={index}>{file.name}</Box>
                          ))
                        ) : (
                          <MuiTypography variant="subtitle2" color={theme.palette.structural.background1} >
                            {uploadmodalData.dropfiles}
                          </MuiTypography>
                        )}
                      </MuiTypography>
                    </Stack>
                    {selectedFiles.length > 0 ? (
                      <MuiButton variant="contained" onClick={navigateToAnotherComponent} sx={{ width: "166px", height: "38px" }} >
                        <MuiTypography variant="body1">
                          {uploadmodalData.uploadFileButton}
                        </MuiTypography>
                      </MuiButton>
                    ) : (
                      <Box {...getRootProps()} data-testid="dropzone" className="dropzone" >
                        <input {...getInputProps()} data-testid="file-input" />
                        <MuiButton variant="outlined" sx={{ width: "166px", height: "46px" }}>
                          <MuiTypography variant="body1">
                            {uploadmodalData.chooseFileButton}
                          </MuiTypography>
                        </MuiButton>
                      </Box>
                    )}
                  </Stack>
                </InnerBox>
              )}
              {selectedTab === uploadmodalData.cloudStorageTab && (
                <InnerBox>
                  <Stack direction={"column"} alignItems={"center"} spacing={8} >
                    <Stack direction={"column"} alignItems={"center"} spacing={3} >
                      <Stack alignItems={"center"}>
                        <MuiTypography variant="subtitle2" color={theme.palette.structural.background1} >
                          {uploadmodalData.dragmedia}
                        </MuiTypography>
                        <MuiTypography variant="subtitle2" color={theme.palette.structural.background1} >
                          {uploadmodalData.connectAnAccount}
                        </MuiTypography>
                      </Stack>
                      <Stack direction={"row"} spacing={8}>
                        <Icon src={modalSvgs.googledrive} height={"50px"} width={"50px"} onClick={onGoogleDriveClick}
                          style={{ cursor: "pointer" }} alt="googledrive-svg" data-testid="goodle-drive"/>
                        <Icon src={modalSvgs.dropbox} height={"50px"} width={"50px"} />
                        <Icon src={modalSvgs.cloudStorageIcon} height={"50px"} width={"50px"} />
                        <Icon src={modalSvgs.terabox} height={"50px"} width={"50px"} />
                      </Stack>
                    </Stack>
                  </Stack>
                </InnerBox>
              )}
            </CenteredBox>
          </DialogContent>
        </Box>
      </Modal>
      {
        showUpdateModal && <UpdateModal isOpen={showUpdateModal} pdfName={uploadedFile?.name} handleUpload={()=>handleUpdateFile(uploadedFile)}/>
      }{
        showUploadLoader && <UploadLoader pdfName={uploadedFile?.name}/>
      }
    </div>
  );
};


