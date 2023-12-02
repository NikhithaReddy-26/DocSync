import React from "react";
import FileInfo from ".";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import FileImage from "../../../../public/images/image.svg"
import PdfIcon from "../../../../public/assets/icons/pdf.svg"
export default {
    title:"Molecules/FileInfo",
    component:FileInfo,
}as Meta<typeof FileInfo>;

const Template: StoryFn<typeof FileInfo> = (args)=> <ThemeProvider theme={theme}><FileInfo {...args}/></ThemeProvider>

export const DefaultFileInfo = Template.bind({});
DefaultFileInfo.args={
    fileImageSrc:FileImage,
    iconSrc:PdfIcon,
    fileName:"presentation.ppt"
}