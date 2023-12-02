import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from ".";

describe("InputField", () => {
  const placeholderText = "Enter email";
  test("renders with placeholder", () => {
    render(<InputField placeholder={placeholderText} variant="outlined" />);
    const inputElement = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(inputElement.value).toBe("New Value");
  });
  test("renders with filled variant", () => {
    render(<InputField placeholder={placeholderText} variant="filled" />);
    const inputElement = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });
});
