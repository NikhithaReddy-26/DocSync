import { Meta, StoryFn } from "@storybook/react";
import Icon from ".";
import search from "../../../../public/assets/icons/search.svg";
import user from "../../../../public/assets/icons/user.svg";
import file from "../../../../public/assets/icons/file-icon.svg";
export default {
  title: "Atoms/Icons",
  component: Icon,
  argTypes: {
    onclick: {
      action: "clicked",
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Icon {...args} />;

export const SearchIcon = Template.bind({});
SearchIcon.args = {
  src: search,
  alt: "searchicon",
};
export const UserIcon = Template.bind({});
UserIcon.args = {
  src: user,
  alt: "usericon",
};
export const FileIcon = Template.bind({});
FileIcon.args = {
  src: file,
  alt: "fileicon",
};
