import { render, screen } from "@testing-library/react";
import FileInfo from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

describe("FileInfo", () => {
  test("File Info renders correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <FileInfo
          fileImageSrc="image"
          fileImageAlt="Image"
          iconSrc="icon"
          iconAlt="Icon"
          fileName="File.ppt"
        />
      </ThemeProvider>
    );
    const Image = screen.getByAltText("Image");
    expect(Image).toBeInTheDocument();
    const Icon = screen.getByAltText("Icon");
    expect(Icon).toBeInTheDocument();
    const FileName = screen.getByText("File.ppt");
    expect(FileName).toBeInTheDocument();
  });
});
