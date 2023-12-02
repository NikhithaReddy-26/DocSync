import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreatePassword from ".";

describe("CreatePassword Component", () => {
  it("should render the CreatePassword component", () => {
    render(<CreatePassword />);
    const createPasswordComponent = screen.getByTestId("create-password");
    expect(createPasswordComponent).toBeInTheDocument();
  });

  it("displays the button with the correct text", () => {
    render(<CreatePassword />);
    const buttonElement = screen.getByText("Reset Password");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should handle confirmPassword input change", () => {
    render(<CreatePassword handleClick={() => {}} />);

    const confirmPasswordInput = screen.getByPlaceholderText(
      "Re-enter your password"
    );

    fireEvent.change(confirmPasswordInput, {
      target: { value: "newPassword123" },
    });

    expect(confirmPasswordInput).toHaveValue("newPassword123");
  });

  it('should show "Passwords do not match" error if passwords do not match', () => {
    render(<CreatePassword handleClick={() => {}} />);

    const passwordInput = screen.getByPlaceholderText("Enter the Password");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Re-enter your password"
    );

    fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentPassword" },
    });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("should enable the button when both passwords match", () => {
    render(<CreatePassword handleClick={() => {}} />);

    const passwordInput = screen.getByPlaceholderText("Enter the Password");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Re-enter your password"
    );
    const button = screen.getByText("Reset Password");

    fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "newPassword123" },
    });

    expect(button).not.toBeDisabled();
  });
  it("Shows password visibility", () => {
    render(<CreatePassword handleClick={() => {}} />);
    const iconElement = screen.getAllByAltText("eye-icon");
    const passwordInput = screen.getByPlaceholderText("Enter the Password");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Re-enter your password"
    );
    fireEvent.click(iconElement[0]);
    expect(passwordInput).toHaveAttribute("type", "text");
    fireEvent.click(iconElement[1]);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
  });
});
