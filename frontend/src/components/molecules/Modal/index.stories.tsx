import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Modal, { ModalProps } from '.';
import { Box, ThemeProvider } from '@mui/material';
import MuiButton from '../../atoms/button';
import theme from '../../../theme';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<ModalProps> = (args) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <Box
          padding={6}
          bgcolor={theme.palette.grey[400]}
          height={'508px'}
          width={'656px'}
        >
          {args.children}
        </Box>
      </Modal>
      <MuiButton onClick={() => setOpen(true)}>Open Modal</MuiButton>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <Box padding={6} bgcolor={theme.palette.grey[400]}>
    </Box>
  ),
};
