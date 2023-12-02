import { Meta, StoryFn } from "@storybook/react";
import Header from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { searchKeywordResults } from "../../../utils/constants";
import Avatar from "../../../../public/assets/icons/avatar.svg";

export default {
  title: "Organisms/Header",
  component: Header,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta;

const fetchResult = async (keyword: string) => {
  return searchKeywordResults;
};

const Template: StoryFn = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <Header
        userId={"IDJR00292"}
        userName={"John Ross"}
        handleLogOut={() => {}}
        avatarSrc={Avatar}
        fetchResults={fetchResult}
        {...args}
      ></Header>
    </ThemeProvider>
  );
};

export const headerStory = Template.bind({});
