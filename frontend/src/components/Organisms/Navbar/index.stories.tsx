import { Meta, StoryFn } from "@storybook/react";
import Sidebar from '.';
import { MemoryRouter } from "react-router-dom";

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn = (args) => <MemoryRouter><Sidebar itemid="home"{...args}/></MemoryRouter>;

export const Default = Template.bind({});
Default.args = {};
