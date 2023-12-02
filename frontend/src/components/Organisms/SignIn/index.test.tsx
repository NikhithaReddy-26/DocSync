import React from "react";
import SignIn from ".";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as services from "../../../services/auth";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter} from "react-router-dom";
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));
describe("SignIn component Test Case", () => {
  const mockUserData = [
    {
      id: 1,
      name: "John Carter",
      email: "john@gmail.com",
      password: "John@123",
    },
  ];
  it("renders correctly", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Create a password")
    ).toBeInTheDocument();
  });

  it("performs email validation correctly", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    expect(
      screen.getByText("email should constraint to validation")
    ).toBeInTheDocument();
  });

  it("performs password validation correctly", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(passwordInput, { target: { value: "short" } });
    expect(
      screen.getByText("it should be greater than 7 characters")
    ).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: "ValidPassword1!" } });
    expect(
      screen.queryByText("it should be greater than 7 characters")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "password must contain one Uppercase letter,one special character"
      )
    ).not.toBeInTheDocument();
  });

  it("disables button when form is invalid", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);

    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    const signInButton = screen.getByTestId("signInButton");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });

    expect(signInButton).toBeDisabled();
  });
  it("displays email and password helper text", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    expect(
      screen.getByText("email should constraint to validation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("it should be greater than 7 characters")
    ).toBeInTheDocument();
  });

  it("email helper text and password helper text rendering test case", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(emailInput, { target: { value: "ab@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "ab12345673" } });
    expect(
      screen.getByText(
        "password must contain one Uppercase letter,one special character"
      )
    ).toBeInTheDocument();
  });
  it("Shows password visibility", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const iconElement = screen.getAllByAltText("eye-icon");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.click(iconElement[0]);
    expect(passwordInput).toHaveAttribute("type", "text");
  });
  it('handling API error', async() => {
    jest.spyOn(services, 'getUsersByEmail').mockResolvedValue(mockUserData);
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: 'John@123' } });
    const signInButton = screen.getByTestId("signInButton");
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toBeEnabled();
    fireEvent.click(signInButton);
    fireEvent.change(passwordInput, { target: { value: 'John@1233' } });
    expect(signInButton).toBeEnabled();
    fireEvent.click(signInButton);
  });

  it("handle google signin", () => {
    render(<BrowserRouter><SignIn /></BrowserRouter>);
    const googleLogin = screen.getByTestId("google-login");
    fireEvent.click(googleLogin);
    expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(0);
  });

});
