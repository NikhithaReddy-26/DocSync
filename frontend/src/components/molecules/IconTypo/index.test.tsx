import React from "react";
import IconTypo from ".";
import fileLogo from "../../../../public/assets/icons/file-drive.svg";
import { render, fireEvent, screen } from "@testing-library/react";

describe("IconTypo Component Test case", () => {
    const iconProps = {
    src: fileLogo,
    width: "50px",
    height: "50px",
  };
  const text = "Company Overview";
  const onChange = jest.fn();

  it("renders icon and text correctly", () => {
    render(<IconTypo iconProps={iconProps} text={text} />);
    const iconElement = screen.getByTestId("icon");
    const textElement = screen.getByText(text);
    expect(iconElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it("renders checkbox when showCheckBox is true", () => {
    render(
      <IconTypo
        iconProps={iconProps}
        text={text}
        showCheckBox={true}
        checked={false}
        onChange={onChange}
      />
    );

    const checkboxElement = screen.getByTestId("checkbox");
    expect(checkboxElement).toBeInTheDocument();
  });

  it("calls onChange when checkbox is clicked", () => {
    const { container } = render(
      <IconTypo
        iconProps={iconProps}
        text={text}
        showCheckBox={true}
        checked={false}
        onChange={onChange}
      />
    );
    const checkbox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
