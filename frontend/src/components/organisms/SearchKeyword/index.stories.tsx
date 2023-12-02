import { StoryFn } from "@storybook/react";
import SearchByKeyword from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { searchKeywordResults } from "../../../utils/constants";

export default {
  title: "Organisms/SearchKeyword",
  component: SearchByKeyword,
  argTypes: {
    onChange: {
      action: "clicked",
    },
  },
};

const fetchResult = async (keyword: string) => {
  return searchKeywordResults;
};

const Template: StoryFn = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchByKeyword fetchResult={fetchResult}></SearchByKeyword>
    </ThemeProvider>
  );
};

export const SearchByKeywordStory = Template.bind({});
