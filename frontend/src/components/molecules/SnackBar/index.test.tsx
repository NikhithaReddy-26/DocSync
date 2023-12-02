import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MuiSnackbar from ".";

test("test should render snackbar", () => {
  render(<MuiSnackbar isOpen message="Test" />);
  const snackbar = screen.getByTestId("snackbar");
  expect(snackbar).toBeInTheDocument();
});

test("test should render snackbar and click on close icon", async () => {
  const onCloseHandler = jest.fn;
  render(<MuiSnackbar isOpen onCloseHandler={onCloseHandler} message="Test" />);
  const snackbar = screen.getByTestId("snackbar");
  expect(snackbar).toBeInTheDocument();
  screen.findByAltText("close-icon").then((isClicked) => {
    fireEvent.click(isClicked);
    expect(onCloseHandler).toBeCalled();
  });
});
