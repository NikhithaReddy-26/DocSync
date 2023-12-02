import InputField from ".";
import { Meta, StoryFn } from "@storybook/react";
import search from "../../../../public/assets/icons/search.svg";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

export default {
  title: "Atoms/InputField",
  component: InputField,
  argTypes: {
    onChange: {
      action: "clicked",
    },
  },
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args) => (
  <ThemeProvider theme={theme}>
    {" "}
    <InputField {...args} />
  </ThemeProvider>
);
export const DefaultTextField = Template.bind({});

DefaultTextField.args = {
  placeholder: "Default TextField",
  variant: "outlined",
};

export const SecondaryTextField = Template.bind({});
SecondaryTextField.args = {
  placeholder: "Secondary TextField",
  variant: "filled",
  customInputProps: { startAdornment: <img src={search} alt="avatar" /> },
};
