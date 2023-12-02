import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import theme from "../../theme";
import ResetPasswordPage from ".";
import {
  createPasswordConstants,
  resetPasswordConstants,
  resetPasswordSuccessConstants,
} from "../../utils/constants";
import * as services from "../../services/auth";
import { BrowserRouter} from "react-router-dom";
jest.mock("../../services/auth", () => ({
  updatePassword: jest.fn(),
  validateEmail: jest.fn(),
  getUsersByEmail: jest.fn(() =>
    Promise.resolve({
      data: [],
    })
  ),
}));

test("test should render the page successfully", () => {
  render(
      <BrowserRouter>
       <ThemeProvider theme={theme}>
      <ResetPasswordPage />
    </ThemeProvider>
    </BrowserRouter>
  );
  const signUpImage = screen.getByAltText("sign-up-image");
  expect(signUpImage).toBeInTheDocument();

  const resetText = screen.getByText(resetPasswordConstants.headingText);
  expect(resetText).toBeInTheDocument();
});

test("test should render the page and send email id and create new password", async () => {
  jest.spyOn(services, "getUsersByEmail").mockResolvedValue([
    {
      id: 1,
      fullname: "John Doe",
      email: "john@gmail.com",
      password: "JohnDoe@001",
    },
  ]);

  jest.spyOn(services, "validateEmail").mockResolvedValue(true);

  render(
    <BrowserRouter>
       <ThemeProvider theme={theme}>
      <ResetPasswordPage />
    </ThemeProvider>
    </BrowserRouter>
  );
  const signUpImage = screen.getByAltText("sign-up-image");
  expect(signUpImage).toBeInTheDocument();

  const email = screen.getByPlaceholderText(
    resetPasswordConstants.emailPlaceholderText
  );
  fireEvent.change(email, { target: { value: "john@gmail.com" } });
  const sendButton = screen.getByText(resetPasswordConstants.buttonText);

  await waitFor(() => {
    fireEvent.click(sendButton);
    const createPasswordHeader = screen.getByText(
      createPasswordConstants.heading
    );
    expect(createPasswordHeader).toBeInTheDocument();
    fireEvent.change(
      screen.getByPlaceholderText(
        createPasswordConstants.newPasswordPlaceeholderText
      ),
      { target: { value: "Test@1234" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        createPasswordConstants.confirmPasswordPlaceholdertext
      ),
      { target: { value: "Test@1234" } }
    );
  });
  fireEvent.click(screen.getByText(createPasswordConstants.buttonText));
  await waitFor(() => {
    expect(
      screen.getByText(resetPasswordSuccessConstants.heading)
    ).toBeInTheDocument();
  });
  const successButton = screen.getByText(
    resetPasswordSuccessConstants.buttonText
  );
  expect(successButton).toBeInTheDocument();
  fireEvent.click(successButton);
});

test("test should render the page and show user not found if email is not present in db", async () => {
  jest.spyOn(services, "validateEmail").mockResolvedValue(false);

  render(
    <BrowserRouter>
       <ThemeProvider theme={theme}>
      <ResetPasswordPage />
    </ThemeProvider>
    </BrowserRouter>
  );
  const signUpImage = screen.getByAltText("sign-up-image");
  expect(signUpImage).toBeInTheDocument();

  const email = screen.getByPlaceholderText(
    resetPasswordConstants.emailPlaceholderText
  );
  fireEvent.change(email, { target: { value: "karan@gmail.com" } });
  const sendButton = screen.getByText(resetPasswordConstants.buttonText);

  await waitFor(() => {
    fireEvent.click(sendButton);
    const error = screen.getByText(resetPasswordConstants.userNotExist);
    expect(error).toBeInTheDocument();
  });
});
