import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DateSelector from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { CalendarProps } from "../../../utils/interfaces";

export default {
  title: "Molecules/DateSelector",
  component: DateSelector,
} as Meta;

const Template: StoryFn<CalendarProps> = (args) => {
  const [date, setDate] = useState<string>(args.date ?? "");

  return (
    <ThemeProvider theme={theme}>
      <DateSelector {...args} date={date} setDate={setDate} />
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Start date",
  setDate: action("setDate"),
};

export const WithDate = Template.bind({});
WithDate.args = {
  label: "Start date",
  date: "2023-08-28",
  setDate: action("setDate"),
};
