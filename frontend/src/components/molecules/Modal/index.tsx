import React from 'react';
import { Backdrop, BackdropProps, Box, styled } from '@mui/material';
import theme from '../../../theme';

export interface ModalProps extends BackdropProps {
  onClose?: () => void; 
  open: boolean;
}

const StyledBackdrop = styled(Backdrop)`
  z-index: 1;
  background-color: ${theme.palette.structural.modalBackground};
`;

const StyledBox = styled(Box)`
  background-color: ${theme.palette.textColor.white};
  border-radius: 6px;
`;

const Modal: React.FC<ModalProps> = ({ onClose, open, ...props }) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <StyledBackdrop {...props} open={open} onClick={handleBackdropClick} data-testid="modal-backdrop">
      <StyledBox>{props.children}</StyledBox>
    </StyledBackdrop>
  );
};

export default Modal;
