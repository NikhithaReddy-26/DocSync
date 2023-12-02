import React from "react";
import CustomCheckBox from ".";
import { render, fireEvent } from "@testing-library/react";

describe("CustomCheckBox Component", () => {
 
    it("renders with default props", () => {
    const { container } = render(<CustomCheckBox />);
    const checkbox = container.querySelector("input[type='checkbox']");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it("renders checked", () => {
    const { container } = render(<CustomCheckBox checked />);
    const checkbox = container.querySelector("input[type='checkbox']");
    expect(checkbox).toBeChecked();
  });

  it("renders disabled", () => {
    const { container } = render(<CustomCheckBox disabled />);
    const checkbox = container.querySelector("input[type='checkbox']");
    expect(checkbox).toBeDisabled();
  });

  it("calls onChange callback when clicked", () => {
    const mockOnChange = jest.fn();
    const { container } = render(<CustomCheckBox onChange={mockOnChange} />);
    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});

