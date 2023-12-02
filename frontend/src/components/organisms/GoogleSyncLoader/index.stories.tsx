import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import SyncProgressMolecule from ".";
export default {
    title:"Organisms/SyncProgressMolecule",
    component:SyncProgressMolecule,
}as Meta<typeof SyncProgressMolecule>;

const Template: StoryFn<typeof SyncProgressMolecule> = (args)=> <ThemeProvider theme={theme}><SyncProgressMolecule {...args}/></ThemeProvider>

export const Default = Template.bind({});
Default.args={
    openModal: true,
}