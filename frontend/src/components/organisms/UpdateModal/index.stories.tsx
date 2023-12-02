import { Meta, StoryFn } from '@storybook/react';
import UpdateModal, { UpdateModalProps } from '.'; 
import { ThemeProvider } from '@emotion/react';
import theme from '../../../theme';

export default {
  component: UpdateModal,
  title: 'Organisms/UpdateModal', 
} as Meta;

const handleCancel = () => {
  console.log('Canceled'); 
};

const handleUpload = () => {
  console.log('Uploaded'); 
};

const Template: StoryFn<UpdateModalProps> = (args) => (
 <ThemeProvider theme={theme}> <UpdateModal {...args} handleCancel={handleCancel} handleUpload={handleUpload} /></ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  pdfName: 'Sample.pdf',
};
