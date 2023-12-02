import { fireEvent, render, screen } from "@testing-library/react";
import SignUp from ".";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter} from "react-router-dom";
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}));
describe("signUp component", () => {
  test("SignUp renders correctly", () => {
    const mockFunction = jest.fn();
    render(<BrowserRouter><SignUp handleSignUp={mockFunction} /></BrowserRouter>);
    const nameField = screen.getByPlaceholderText(
      "John Cena"
    ) as HTMLInputElement;
    fireEvent.change(nameField, { target: { value: "John" } });
    expect(nameField.value).toBe("John");
    const email = screen.getByPlaceholderText(
      "john@example.com"
    ) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "John" } });
    expect(
      screen.getByText("email should constraint to validation")
    ).toBeInTheDocument();
    fireEvent.change(email, { target: { value: "Test@gmail.com" } });
    expect(email.value).toBe("Test@gmail.com");
    const pswd = screen.getByPlaceholderText(
      "Create a password"
    ) as HTMLInputElement;
    fireEvent.change(pswd, { target: { value: "Test@123" } });
    expect(pswd.value).toBe("Test@123");
    const create = screen.getByText("Create Account");
    expect(create).toBeInTheDocument();
    const createAccountButton = screen.getByTestId("signInButton");

    fireEvent.click(createAccountButton);
    expect(mockFunction).toBeCalled();
    const google = screen.getByText("Continue with Google");
    expect(google).toBeInTheDocument();
    expect(create).toBeEnabled();
  });
  test("test for checking invalid states and disabled button", () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
         <SignUp />
       
      </ThemeProvider>
      </BrowserRouter>
    );
    const nameInput = screen.getByPlaceholderText("John Cena");
    const emailInput = screen.getByPlaceholderText("john@example.com");
    const passwordInput = screen.getByPlaceholderText("Create a password");

    fireEvent.change(nameInput, { target: { value: "name1" } });
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    expect(screen.getByText("Name should not be empty")).toBeInTheDocument();
    expect(
      screen.getByText("email should constraint to validation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("it should be greater than 7 characters")
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    expect(
      screen.getByText(
        "password must contain one Uppercase letter,one special character"
      )
    ).toBeInTheDocument();

    const signUp = screen.getByRole("button", { name: "Create Account" });
    expect(signUp).toBeDisabled();
  });
  it("Shows password visibility", () => {
    render(
      <BrowserRouter>
     <ThemeProvider theme={theme}>
         <SignUp /> 
      </ThemeProvider>
      </BrowserRouter>
    );
    const iconElement = screen.getAllByAltText("eye-icon");
    const passwordInput = screen.getByPlaceholderText("Create a password");
    fireEvent.click(iconElement[0]);
    expect(passwordInput).toHaveAttribute("type", "text");
  });
  test("handle google signin method test cases", () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
         <SignUp />
       
      </ThemeProvider>
      </BrowserRouter>
    );

    const googleLogin = screen.getByTestId("google-login");
    fireEvent.click(googleLogin);
    expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(0);
  });
});
