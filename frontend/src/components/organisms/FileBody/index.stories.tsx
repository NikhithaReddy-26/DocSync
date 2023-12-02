import { Meta, StoryFn } from "@storybook/react";
import FileBody from ".";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material";
import { fileBodyFiles } from "../../../utils/constants";
import { File } from "./hook";

export default {
  title: "Organisms/FileBody",
  component: FileBody,
} as Meta;

const Template: StoryFn = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <FileBody fetchFiles={function (): Promise<File[]> {
        throw new Error();
      } } {...args} />
    </ThemeProvider>
  );
};

export const FilesStory = Template.bind({});

FilesStory.args = {
  fetchFiles: async () => {
    return fileBodyFiles;
  },
};
