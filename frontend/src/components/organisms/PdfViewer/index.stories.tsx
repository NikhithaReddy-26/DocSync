import { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import PdfjsExpress from ".";

export default {
  title: "organisms/PdfViewer",
  component: PdfjsExpress,
} as Meta<typeof PdfjsExpress>;

const Template: StoryFn = (args) => (
  <ThemeProvider theme={theme}>
    <PdfjsExpress
      searchKey="sample"
      documentUrl="/files/sample.pdf"
      setDocViewerState={() => Object}
      setSearchKeywordOccurrences={() => Object}
    />
  </ThemeProvider>
);

export const Default = Template.bind({});

Default.args = {};