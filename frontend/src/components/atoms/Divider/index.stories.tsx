import { Meta, StoryFn } from "@storybook/react";
import CustomDivider from "./";
import { Typography } from "@mui/material";

export default {
  title: "Atoms/Divider",
  component: CustomDivider,
} as Meta;

const Template: StoryFn = (args) => <CustomDivider {...args}></CustomDivider>;

export const Default = Template.bind({});
Default.args = {};

export const WithText = Template.bind({});
WithText.args = {
  children: <Typography variant={"body1"}>Or</Typography>,
};
