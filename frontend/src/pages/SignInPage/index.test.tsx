import React from "react";
import { render } from "@testing-library/react";
import SignInPage from ".";
import { BrowserRouter} from "react-router-dom";
describe("SignInPage test cases", () => {
  test("renders SignIn component within SignInPage", () => {
    const { getByTestId } = render(<BrowserRouter><SignInPage/></BrowserRouter>);
    const signInComponent = getByTestId("signIn-component");
    expect(signInComponent).toBeInTheDocument();
  });
});
