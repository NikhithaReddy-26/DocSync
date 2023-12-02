import { StoryFn } from "@storybook/react";
import HomeTemplate from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import Header from "../../organisms/Header";
import FileBody from "../../organisms/FileBody";
import Sidebar from "../../Organisms/Navbar";

export default {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
};

const Template: StoryFn = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <HomeTemplate
        header={<></>}
        sideBar={<></>}
        bodyContent={<></>}
        {...args}
      />
    </ThemeProvider>
  );
};

export const HomeTemplateStory = Template.bind({});
HomeTemplateStory.args = {
  header: (
    <Header
      avatarSrc=""
      fetchResults={async () => {
        return [];
      }}
      handleLogOut={() => {}}
      userId="12345"
      userName="John Carter"
    />
  ),
  bodyContent: <FileBody />,
  sideBar: <Sidebar />,
};
