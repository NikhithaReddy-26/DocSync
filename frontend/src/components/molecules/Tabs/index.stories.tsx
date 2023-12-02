import { Meta, StoryFn } from "@storybook/react";
import MuiTabs from ".";
import { MuiTabsProps } from "../../../utils/interfaces";

export default {
  title: "Molecules/MuiTabs",
  component: MuiTabs,
  argTypes: {
    onSelectTab: { action: "Tab Selected" },
    selectedTab: { control: "text" },
  },
} as Meta;

const Template: StoryFn<MuiTabsProps> = (args) => <MuiTabs {...args} />;

export const StandardTabs = Template.bind({});
StandardTabs.args = {
  tabNames: ["All files", "Slides", "Docs"],
  selectedTab: "All files",
};

export const ColoredTabs = Template.bind({});
ColoredTabs.args = {
  tabNames: ["Uploads", "Cloud Storage"],
  selectedTab: "Cloud Storage",
  activeTabColor: "white",
  tabWidth: "363px",
};
