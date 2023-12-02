import { Meta, StoryFn } from "@storybook/react";
import MuiSnackbar from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Molecules/Snackbar",
  component: MuiSnackbar,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <MuiSnackbar isOpen {...args} />
  </ThemeProvider>
);

export const TextCopiedSnackBar = Template.bind({});
TextCopiedSnackBar.args = {
  message: "Text copied",
  width: "200px",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
};
