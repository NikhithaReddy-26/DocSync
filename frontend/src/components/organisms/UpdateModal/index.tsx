import React from 'react';
import MuiTypography from '../../atoms/Typography';
import { styled, Box } from '@mui/material';
import theme from '../../../theme';
import MuiButton from '../../atoms/button';
import { updateModalData } from '../../../utils/constants';
import Modal from '../../molecules/Modal';


export interface UpdateModalProps {
  handleCancel?: () => void;
  handleUpload?: () => void;
  pdfName?: string;
  isOpen: boolean;
}

const RootBox = styled(Box)({
  width: theme.spacing(121),
  height: theme.spacing(61.5),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[400],
  paddingBottom: "25px"
});

const BaseComponent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(8),
  gap: theme.spacing(5)
});

const FooterComponent = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: "center",
  gap: theme.spacing(4),
});

const UpdateModal = ({
  handleCancel,
  handleUpload,
  pdfName,
  isOpen
}: UpdateModalProps) => {
  return (
    <Modal data-testid="confirmation-Modal" open={isOpen} >
      <RootBox>
        <BaseComponent>
          <Box>
            <MuiTypography
              children={updateModalData.header}
              variant="h3"
              color={theme.palette.structural.background1}
            />
          </Box>
          <Box>
            <MuiTypography
              children={pdfName}
              variant="subtitle2"
              color={theme.palette.structural.background1}
              display="inline"
            />
            <MuiTypography
              children={updateModalData.content}
              variant="subtitle2"
              color={theme.palette.textColor.highEmphasis}
              display="inline"
            />
          </Box>
          <FooterComponent >
            <MuiButton
              children={<MuiTypography children={updateModalData.cancel} variant="body1"/>}
              variant="outlined"
              onClick={handleCancel}
              sx={{
                width:"96px",
                height: "36px"
              }}
              data-testid="cancel-button"
            />
            <MuiButton
              children={<MuiTypography children={updateModalData.upload} variant="body1" data-testid="update-button" />}
              variant="contained"
              onClick={handleUpload}
              sx={{
                width:"96px",
                height: "36px"
              }}
              data-testid="updateButton"
            />
          </FooterComponent>
        </BaseComponent>
      </RootBox>
    </Modal>
  );
};

export default UpdateModal;