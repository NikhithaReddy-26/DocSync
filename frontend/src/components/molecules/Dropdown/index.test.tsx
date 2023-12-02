import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomDropdown from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";

describe("DropDown", () => {
  test("renders without errors", () => {
    render(
      <ThemeProvider theme={theme}>
        <CustomDropdown
          menuItems={{ key1: "Item 1", key2: "Item 2" }}
          placeholder="Select an item"
          label="Select Label"
          value={""}
          onChange={() => {}}
        />
      </ThemeProvider>
    );
  });

  test("updates the value when an item is selected", () => {
    const { getByRole, getByText } = render(
      <ThemeProvider theme={theme}>
        {" "}
        <CustomDropdown
          menuItems={{ key1: "Item 1", key2: "Item 2" }}
          placeholder="Select an item"
          label="Select Label"
          value={""}
          onChange={() => {}}
        />
      </ThemeProvider>
    );
    const selectButton = getByRole("button", { name: "Select an item" });
    fireEvent.mouseDown(selectButton);

    const item1 = getByText("Item 1");
    fireEvent.click(item1);
  });
  test("handles reset when close icon is clicked", () => {
    const mockOnChange = jest.fn();
    const { getByAltText } = render(
      <ThemeProvider theme={theme}>
        {" "}
        <CustomDropdown
          menuItems={{ key1: "Item 1", key2: "Item 2" }}
          placeholder="Select an item"
          label="Select Label"
          value={"selectedValue"}
          onChange={mockOnChange}
        />
      </ThemeProvider>
    );

    const closeIcon = getByAltText("not found close image");
    fireEvent.click(closeIcon);

    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
