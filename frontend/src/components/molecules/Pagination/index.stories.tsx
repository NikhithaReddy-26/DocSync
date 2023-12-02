import { Meta, StoryFn } from "@storybook/react";
import Pagination from ".";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../theme";

export default {
  title: "Molecules/Pagination",
  component: Pagination,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <Pagination {...args} />
  </ThemeProvider>
);

export const PaginationStory = Template.bind({});
PaginationStory.args = {
  totalPages: 5,
  currentPage: 1,
  zoomValue: 85,
};
