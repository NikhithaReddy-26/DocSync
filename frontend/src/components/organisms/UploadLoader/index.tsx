import React from 'react';
import MuiTypography from '../../atoms/Typography';
import { Box, Stack } from '@mui/material';
import theme from '../../../theme';
import Icon from '../../atoms/Icons';
import close from "../../../../public/assets/icons/close-white.svg";
import pdfIcon from "../../../../public/assets/icons/pdf.svg";
import ProgressBar from '../../atoms/ProgressBar';
import Modal from '../../molecules/Modal';
import { useUploadLoader } from './hooks';


export interface UpdateModalProps {
  pdfName?: string;
}

export const UploadLoader = ({
  pdfName
}: UpdateModalProps) => {
  const { visible } = useUploadLoader(); 

  return (
    <>
      {visible && (
        <Modal open={true} onClose={() => {}}>
          <Box
            data-testid="loader-Modal"
            bgcolor={theme.palette.grey[400]}
            borderRadius={theme.spacing(1)}
            padding={"20px"}
            width="696px"
            height="508px"
          >
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Icon src={close} />
            </Box>
            <Box
              padding={"20%"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack direction="column" spacing={8}>
                <Stack direction="column" alignItems="center">
                  <Icon src={pdfIcon} width="80px" height="80px" />
                  <MuiTypography
                    children={pdfName}
                    variant="subtitle2"
                    color={theme.palette.structural.background1}
                    display="inline"
                  />
                </Stack>
                <Box width="346px">
                  <ProgressBar />
                  <MuiTypography
                    children={"Uploading (1/1)"}
                    variant="subtitle2"
                    color={theme.palette.structural.background1}
                    display="flex"
                    justifyContent="flex-end"
                  />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
