import React from "react";
import FunctionalBar from ".";
import theme from "../../../theme";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";

describe("FunctionalBar component", () => {
  it("renders without errors", () => {
    render(
      <ThemeProvider theme={theme}>
        <FunctionalBar />
      </ThemeProvider>
    );
  });

  it("displays dropdowns with the correct labels", () => {
    render(
      <ThemeProvider theme={theme}>
        <FunctionalBar />
      </ThemeProvider>
    );
    const fileTypeButton = screen.getByRole("button", { name: "File type" });
    const publishSettingDropdown = screen.getByRole("button", {
      name: "Publish Setting",
    });
    fireEvent.mouseDown(fileTypeButton);
    const item1 = screen.getByText("PDF");
    fireEvent.click(item1);
    fireEvent.mouseDown(publishSettingDropdown);
    const item2 = screen.getByText("Published by me");
    fireEvent.click(item2);
  });

  it("updates state when a date is selected", () => {
    const currentDate = new Date();

    render(
      <ThemeProvider theme={theme}>
        <FunctionalBar />
      </ThemeProvider>
    );
    const dateWrappers = screen.getAllByTestId("date-selector-wrapper");
    const dateWrapper = dateWrappers[0];
    fireEvent.click(dateWrapper);
    const dayButton = screen.getByText(currentDate.getDate().toString());
    fireEvent.click(dayButton);
    const day = currentDate.getDate();
    const month = currentDate.toLocaleDateString("en-US", { month: "long" });
    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("updates state when end date is selected", () => {
    const currentDate = new Date();
    render(
      <ThemeProvider theme={theme}>
        <FunctionalBar />
      </ThemeProvider>
    );
    const dateWrappers = screen.getAllByTestId("date-selector-wrapper");
    const endDateWrapper = dateWrappers[1];
    fireEvent.click(endDateWrapper);
    const dayButton = screen.getByText(currentDate.getDate().toString());
    fireEvent.click(dayButton);
    const day = currentDate.getDate();
    const month = currentDate.toLocaleDateString("en-US", { month: "long" });
    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
