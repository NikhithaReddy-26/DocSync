import React from "react";
import CustomCheckBox from ".";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Atoms/Checkbox",
  component: CustomCheckBox,
  argTypes: {
    onChange: {
      action: "clicked",
    },
    color: {
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
      ],
      control: { type: "select" },
    },
    size: {
      options: [
       "small","medium"
      ],
      control: { type: "select" },
    },
  },
} as Meta<typeof CustomCheckBox>;

const Template: StoryFn<typeof CustomCheckBox> = (args) => (
  <CustomCheckBox {...args} />
);

export const PrimaryCheckbox = Template.bind({});

PrimaryCheckbox.args = {
  color: "primary",
  disabled: false,
};

