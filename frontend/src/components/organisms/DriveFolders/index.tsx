import { DriveFile, DriveFileProps } from "../../../utils/interfaces";
import MuiButton from "../../atoms/button";
import { List, ListItem, ListItemButton, Stack, styled,Box, DialogTitle, DialogContent } from "@mui/material";
import theme from "../../../theme";
import Icon from "../../atoms/Icons";
import folderLogo from "../../../../public/assets/icons/file-drive.svg";
import fileLogo from "../../../../public/assets/icons/drive-file.svg";
import RightIcon from "../../../../public/assets/icons/right-arrow.svg";
import MuiTypography from "../../atoms/Typography";
import { GoogleDriveSyncConstants,modalSvgs } from "../../../utils/constants";
import { CustomRadio } from "../../atoms/Radio";
import IconTypo from "../../molecules/IconTypo";
import useDriveFolderLogic from "./hook";
import Modal from "../../molecules/Modal";

const StyledDivider = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const StyledButton = styled(MuiButton)({
  width: "75px",
});
const StyledStack = styled(Stack)({
  backgroundColor: theme.palette.grey[400],
  paddingLeft: "24px",
  paddingRight: "24px",
});
const StyledDriveItems = styled(Stack)({
  width: "100%",
  flexDirection: "row",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "4px",
  justifyContent: "space-between",
});

const DriveFolders = ({ driveFiles }: DriveFileProps) => {
  const {
    open,
    showFolder,
    files,
    getFolders,
    handleClickFolder,
    handleBack,
    handleClose,
    folderHeading,
    checkedFiles,
    handleFileCheckToggle,
    handleSyncFiles,
    handleFileUncheck,
  } = useDriveFolderLogic(driveFiles);

  return (
    <Modal open={open} onClose={handleClose} data-testId="driveFolders">
      <Box
        data-testid="upload-modal"
        bgcolor={theme.palette.grey[400]}
        borderRadius={theme.spacing(1)}
        width="696px"
        height="100%"
      >
        <DialogTitle>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
              padding={"10px 0 0 25px"}
            >
              <Icon
                src={modalSvgs.leftArrow}
                data-testid="left-arrow-icon"
                onClick={handleBack}
                style={{ cursor: "pointer" }}
                alt="back-icon"
              />
              <MuiTypography
                variant="h3"
                color={theme.palette.structural.background1}
              >
                {folderHeading}
              </MuiTypography>
            </Box>
            <Box
              style={{ marginLeft: "auto", cursor: "pointer" }}
              paddingRight={"20px"}
            >
              <Icon
                src={modalSvgs.closeIcon}
                onClick={handleClose}
                alt="close"
                data-testid="close"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <StyledDivider />

          <StyledStack>
            <Stack paddingY={"16px"} spacing={1}>
              {showFolder && (
                <>
                  <Stack>
                    <MuiTypography
                      variant="body2"
                      color={theme.palette.textColor.white}
                    >
                      {GoogleDriveSyncConstants.folderHeading}
                    </MuiTypography>
                  </Stack>
                  <Stack direction={"row"} spacing={2}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <CustomRadio checked={false} />
                      <MuiTypography
                        variant="body2"
                        color={theme.palette.textColor.highEmphasis}
                      >
                        {GoogleDriveSyncConstants.syncOption1}
                      </MuiTypography>
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <CustomRadio checked />
                      <MuiTypography
                        variant="body1"
                        color={theme.palette.textColor.white}
                      >
                        {GoogleDriveSyncConstants.syncOption2}
                      </MuiTypography>
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
            <Stack direction={"column"} spacing={2}>
              {showFolder ? (
                <List>
                  {getFolders()
                    .slice(0, 3)
                    .map((item: DriveFile) => (
                      <ListItem key={item.id}>
                        <ListItemButton
                          onClick={() => {
                            handleClickFolder(item);
                          }}
                          data-testid="listItem"
                        >
                          <StyledDriveItems>
                            <IconTypo
                              iconProps={{
                                src: folderLogo,
                                width: "50px",
                                height: "50px",
                              }}
                              text={item.name}
                            />
                            <Icon src={RightIcon} alt="RightArrow" />
                          </StyledDriveItems>
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <List>
                  {files
                    .filter((file) => file.trashed === false)
                    .map((file) => (
                      <ListItem key={file.id}>
                        <ListItemButton data-testid="listItemCheckbox">
                          <StyledDriveItems>
                            <IconTypo
                              iconProps={{
                                src: fileLogo,
                                width: "50px",
                                height: "50px",
                              }}
                              text={file.name}
                              showCheckBox
                              checked={checkedFiles[file.name] || false}
                              onChange={() => {
                                checkedFiles[file.name]
                                  ? handleFileUncheck(file.name)
                                  : handleFileCheckToggle(file.name, file);
                              }}
                            />
                          </StyledDriveItems>
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
              )}
            </Stack>
            <Stack
              paddingY={"35px"}
              direction={"row"}
              spacing={2}
              justifyContent={"flex-end"}
            >
              <StyledButton
                variant="outlined"
                children="Back"
                onClick={handleBack}
                data-testid="back"
              />
              <StyledButton
                variant="contained"
                children="Sync"
                onClick={handleSyncFiles}
                disabled={Object.keys(checkedFiles).length === 0}
                data-testid="sync"
              />
            </Stack>
          </StyledStack>
        </DialogContent>
      </Box>
    </Modal>
  );
};

export default DriveFolders;
