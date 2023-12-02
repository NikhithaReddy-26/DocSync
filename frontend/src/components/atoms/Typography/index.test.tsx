import React from "react";
import MuiTypography from ".";
import { render } from "@testing-library/react";

describe("MuiTypography Component Test case", () => {
  
    test("renders text content", () => {
    const { getByText } = render(<MuiTypography>Test Text</MuiTypography>);
    const textElement = getByText("Test Text");
    expect(textElement).toBeInTheDocument();
  });

  test("passing props to typography", () => {
    const { getByText } = render(
      <MuiTypography variant="h6">Heading Text</MuiTypography>
    );
    const headingElement = getByText("Heading Text");
    expect(headingElement).toHaveClass("MuiTypography-h6");
  });
});
