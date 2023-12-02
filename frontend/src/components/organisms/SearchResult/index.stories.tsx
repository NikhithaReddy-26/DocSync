import { Meta, StoryFn } from "@storybook/react";
import SearchResult, { Result } from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Organisms/SearchResult",
} as Meta;

const Template: StoryFn = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchResult searchResults={[]} searchedText="" {...args} />
    </ThemeProvider>
  );
};

export const SearchResultStory = Template.bind({});
SearchResultStory.args = {
  searchedText: "Repair business",
  searchResults: [
    {
      id: 1,
      fileName: "Company Agreement",
      description:
        "Since being established in 1908 as a sewing machine repair business, the brother group has pursued the diversification and globalization of business in its history of more...",
      foundOn: 1,
      totalSlide: 5,
    },
    {
      id: 2,
      fileName: "Contract",
      description:
        "Since being a sewing machine repair business, the brother group has pursued the diversification of business in its history of more...",
      foundOn: 2,
      totalSlide: 5,
    },
  ],
};
