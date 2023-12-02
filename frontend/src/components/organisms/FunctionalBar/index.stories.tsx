import { Meta, StoryFn } from "@storybook/react";
import theme from "../../../theme";
import FunctionalBar from ".";
import { ThemeProvider } from "@mui/material";

export default {
  title: "Organisms/FunctionalBar",
  component: FunctionalBar,
} as Meta<typeof FunctionalBar>;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <FunctionalBar />
  </ThemeProvider>
);

export const DefaultFunctionalBar = Template.bind({});
