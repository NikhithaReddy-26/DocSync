import React from "react";
import avatar from "../../../../public/assets/icons/avatar.svg";
import { StoryFn, Meta } from "@storybook/react";
import Avatar from ".";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const PrimaryAvatar = Template.bind({});

PrimaryAvatar.args = {
  src: avatar,
  alt: "ContiqAvatar",
};
