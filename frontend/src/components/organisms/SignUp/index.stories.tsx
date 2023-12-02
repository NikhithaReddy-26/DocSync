import { Meta, StoryFn } from "@storybook/react";
import SignUp from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default{
    title:"Organisms/signup",
    component:SignUp,
    argTypes: {
        onClick: {
          action: "clicked",
        },
      },
}as Meta<typeof SignUp>

const Template: StoryFn = (args)=><ThemeProvider theme={theme}><SignUp {...args}/></ThemeProvider>
export const Default = Template.bind({});
Default.args ={}
