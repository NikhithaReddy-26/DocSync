import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DateSelector from "./index";

describe("DateSelector Component", () => {
  const mockSetDate = jest.fn();
  const mockProps = {
    label: "Select Date",
    date: "",
    setDate: mockSetDate,
  };

  beforeEach(() => {
    render(<DateSelector {...mockProps} />);
  });

  it("renders the label when date is empty", () => {
    const labelElement = screen.getByText("Select Date");
    expect(labelElement).toBeInTheDocument();
  });

  it("closes the popover when clicked outside", () => {
    const wrapper = screen.getByTestId("date-selector-wrapper");
    fireEvent.click(wrapper);
    const outsideElement = screen.getByText("Select Date");
    fireEvent.mouseDown(outsideElement);
    const popover = screen.queryByRole("popover");
    expect(popover).not.toBeInTheDocument();
  });

  it("renders the expand more icon initially", () => {
    const expandMoreIcon = screen.getByTestId("expand-more-icon");
    expect(expandMoreIcon).toBeInTheDocument();
  });

  it("renders the expand less icon when popover is open", () => {
    const wrapper = screen.getByTestId("date-selector-wrapper");
    fireEvent.click(wrapper);
    const expandLessIcon = screen.getByTestId("expand-less-icon");
    expect(expandLessIcon).toBeInTheDocument();
  });

  it("updates the date when a day is selected", () => {
    const currentDate = new Date();
    const wrapper = screen.getByTestId("date-selector-wrapper");
    fireEvent.click(wrapper);
    const dayButton = screen.getByText(currentDate.getDate().toString());
    fireEvent.click(dayButton);
  });
  test("closeClickHandler sets date to empty and closes the popover", () => {
    const setDateMock = jest.fn();
    const props = {
      label: "Select Date",
      date: "August 30 2023",
      setDate: setDateMock,
    };

    const { getByTestId } = render(<DateSelector {...props} />);

    const icon = getByTestId("icon");
    fireEvent.click(icon);

    expect(setDateMock).toHaveBeenCalledWith("");
  });
});
