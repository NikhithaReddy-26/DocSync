import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from ".";

test("test should render the pagination", () => {
  render(<Pagination />);
  const pagination = screen.getByTestId("pagination");
  expect(pagination).toBeInTheDocument();
});

test("test should render the pagination and click on add icon", () => {
  const onZoomIn = jest.fn;
  render(<Pagination onZoomIn={onZoomIn} />);
  const pagination = screen.getByTestId("pagination");
  expect(pagination).toBeInTheDocument();
  screen.findByAltText("add-icon").then((element) => {
    fireEvent.click(element);
    expect(onZoomIn).toBeCalled();
  });
});

test("test should render the pagination and click on minus icon", () => {
  const onZoomOut = jest.fn;
  render(<Pagination onZoomOut={onZoomOut} />);
  const pagination = screen.getByTestId("pagination");
  expect(pagination).toBeInTheDocument();
  screen.findByAltText("minus-icon").then((element) => {
    fireEvent.click(element);
    expect(onZoomOut).toBeCalled();
  });
});
