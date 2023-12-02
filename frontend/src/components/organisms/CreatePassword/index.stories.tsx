import theme from "../../../theme";
import CreatePassword from ".";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";


export default {
  title: "Organisms/CreatePassword",
  component: CreatePassword,
  argTypes: {
    handleClick: {
      action: "clicked",
    },
  },
} as Meta<typeof CreatePassword>;

const Template: StoryFn<typeof CreatePassword> = (args) => (
  <ThemeProvider theme={theme}>
    <CreatePassword {...args} />
  </ThemeProvider>
);

export const CreatePasswordStory = Template.bind({});
