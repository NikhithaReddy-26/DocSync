import { Meta, StoryFn } from "@storybook/react";
import AddFiles from ".";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme";

export default {
  title: "organisms/addFiles",
  component: AddFiles,
} as Meta<typeof AddFiles>;

const Template: StoryFn<typeof AddFiles> = () => (
  <ThemeProvider theme={theme}>
    <AddFiles />
  </ThemeProvider>
);

export const DefaultFiles = Template.bind({});
