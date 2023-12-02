import Icon from ".";
import { render, screen, fireEvent } from "@testing-library/react";
test("should render icon component", () => {
  render(<Icon />);
});
test("should render Icon props alternate text component", () => {
  render(<Icon alt="an-image" />);
});
test("should render Icon props with height and width", () => {
  render(<Icon alt="an-image" width="24px" height="24px" />);
});
test("should render Icon when clicked", () => {
  render(<Icon />);
  screen.findByTestId("icon").then((isClicked) => {
    fireEvent.click(isClicked);
  });
});
