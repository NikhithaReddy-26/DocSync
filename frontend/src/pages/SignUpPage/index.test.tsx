import React from "react";
import SignUpPage from ".";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as services from "../../services/auth";
import { BrowserRouter} from "react-router-dom";

describe("SignUpPage test case", () => {
  jest.mock("../../services/auth", () => ({
    registerUser: jest.fn(() => Promise.resolve({ data: [] })),
    getUserByEmail: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            fullname: "John Doe",
            email: "john@gmail.com",
            password: "JohnDoe@001",
          },
        ],
      })
    ),
  }));
  test("renders SignUpPage without errors", () => {
    render(<BrowserRouter><SignUpPage /></BrowserRouter>);
  });

  test("renders Icon component within SignUpPage", () => {
    render(<BrowserRouter><SignUpPage /></BrowserRouter>);
    const icon = screen.getByTestId("image-component");
    expect(icon).toBeInTheDocument();
  });

  test("renders SignUp component within SignUpPage", () => {
    render(<BrowserRouter><SignUpPage /></BrowserRouter>);
    const signUpComponent = screen.getByTestId("signUp-component");
    expect(signUpComponent).toBeInTheDocument();
  });

  it("handles sign-up correctly", () => {
    render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText("John Cena"), {
      target: { value: "contiq" },
    });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), {
      target: { value: "contiq@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Contiq@123" },
    });
    expect(screen.getByTestId("signInButton")).toBeEnabled();
    fireEvent.click(screen.getByText("Create Account"));

    jest.resetModules();
    jest.clearAllMocks();
  });
  jest.mock("../../services/auth", () => ({
    registerUser: jest.fn(() => Promise.resolve({ data: [] })),
    getUsersByEmail: jest.fn(),
  }));
  it("handles sign-up with successful registration", async () => {
    jest.spyOn(services, "getUsersByEmail").mockResolvedValue([]);

    render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText("John Cena"), {
      target: { value: "contiq" },
    });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), {
      target: { value: "contiq@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "Contiq@123" },
    });

    expect(screen.getByTestId("signInButton")).toBeEnabled();

    fireEvent.click(screen.getByText("Create Account"));
  });
  it("handles sign-up with user already present", async () => {
    jest.spyOn(services, "getUsersByEmail").mockResolvedValue([
      {
        id: 1,
        fullname: "John Doe",
        email: "john@gmail.com",
        password: "JohnDoe@001",
      },
    ]);

    render(<BrowserRouter><SignUpPage /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText("John Cena"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("john@example.com"), {
      target: { value: "john@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a password"), {
      target: { value: "JohnDoe@001" },
    });
    expect(screen.getByTestId("signInButton")).toBeEnabled();
    fireEvent.click(screen.getByText("Create Account"));
  });

});
