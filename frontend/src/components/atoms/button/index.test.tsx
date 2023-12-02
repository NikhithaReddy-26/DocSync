import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GoogleIcon from "./../../../../public/assets/icons/google.svg";
import MuiButton from ".";
import { IconProps } from "../Icons";

test("test should renders MuiButton component", () => {
  const { getByText } = render(<MuiButton>Test Button</MuiButton>);
  const buttonElement = getByText(/Test Button/i);
  expect(buttonElement).toBeInTheDocument();
});

test("test should renders with startIconSrc", () => {
  const iconProps: IconProps = {
    src: GoogleIcon,
    alt: "google-icon",
  };
  const { getByRole } = render(
    <MuiButton iconProps={iconProps}>Button Text</MuiButton>
  );

  const buttonElement = getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("test should click on MuiButton component and onClickHandler should called", () => {
  const onClickHandlerMock = jest.fn();

  const { getByText } = render(
    <MuiButton onClick={onClickHandlerMock}>Test Button</MuiButton>
  );
  const buttonElement = getByText(/Test Button/i);
  expect(buttonElement).toBeInTheDocument;
  screen.findByText(/Test Button/i).then((isClicked) => {
    fireEvent.click(isClicked);
    expect(onClickHandlerMock).toBeCalled();
  });
});
