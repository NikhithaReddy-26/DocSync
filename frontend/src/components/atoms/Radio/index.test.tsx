import { fireEvent, render, screen } from "@testing-library/react";
import { CustomRadio } from ".";
import React from "react";

describe("CustomRadio component", () => {
  test("renders correctly", () => {
    render(<CustomRadio size={"small"} />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeInTheDocument();
  });
  test("handles onChange event", () => {
    const handleChange = jest.fn();
    render(<CustomRadio onChange={handleChange} />);
    const radio = screen.getByRole("radio");
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  test("disabled radio renders correctly", () => {
    render(<CustomRadio disabled />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });
});
