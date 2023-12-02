import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { UploadLoader, UpdateModalProps } from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

jest.useFakeTimers();

describe("UploadLoader Component", () => {
  const mockPdfName = "sample.pdf";

  it("renders the component with provided pdfName", () => {
    render(
      <ThemeProvider theme={theme}>
        <UploadLoader pdfName={mockPdfName} />
      </ThemeProvider>
    );

    const pdfNameElement = screen.getByText(mockPdfName);
    expect(pdfNameElement).toBeInTheDocument();
  });

  it("fades off after 5 seconds", () => {
    render(
      <ThemeProvider theme={theme}>
        <UploadLoader pdfName={mockPdfName} />
      </ThemeProvider>
    );

    const mainContainer = screen.getByTestId("loader-Modal");
    expect(mainContainer).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    waitFor(() => {
      expect(mainContainer).not.toBeInTheDocument();
    });
  });
});