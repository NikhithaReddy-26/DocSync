import theme from "../../../theme";
import SignUpTemplate from ".";
import Icon from "../../atoms/Icons";
import header from "../../../../public/images/leftContainer.png";
import SignIn from "../../Organisms/SignIn";
import { Stack } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
export default {
  title: "Templates/SignUpTemplate",
  component: SignUpTemplate,
} as Meta;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
  <SignUpTemplate {...args}/>
  </ThemeProvider>
);

export const SignUpTemplateStory = Template.bind({});
SignUpTemplateStory.args={
    leftChildren:<Icon src={header}/>,
    rightChildren:<Stack marginTop="5rem"  justifyContent="center"><SignIn/></Stack>,
}
