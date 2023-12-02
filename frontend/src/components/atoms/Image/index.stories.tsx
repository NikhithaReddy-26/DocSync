import { Meta, StoryFn } from "@storybook/react";
import Image from ".";
import FileNotFoundSrc from "./../../../../public/images/File-not-found.svg";

export default {
  title: "Atoms/Image",
  component: Image,
} as Meta;

const Template: StoryFn = (args) => <Image {...args} />;

export const FileNotFound = Template.bind({});

FileNotFound.args = {
  src: FileNotFoundSrc,
  alt: "file not found image",
  height: "200px",
  width: "321px",
};
