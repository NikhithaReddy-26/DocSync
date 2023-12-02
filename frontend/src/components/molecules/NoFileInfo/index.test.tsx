import React from "react";
import NoFileInfo from ".";
import { render } from "@testing-library/react";

describe("NoFileInfo Molecule test Case", () => {
 
    it("renders without errors", () => {
    const { container } = render(<NoFileInfo />);
    expect(container).toBeInTheDocument();
  });

  it("displays the correct image", () => {
    const { getByTestId } = render(<NoFileInfo />);
    const image=getByTestId("image") ;
    expect(image).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    const { getByText } = render(<NoFileInfo />);
    const heading = getByText("No Files Available");
    expect(heading).toBeInTheDocument();
  });

  it("displays the correct subheading", () => {
    const { getByText } = render(<NoFileInfo />);
    const subheading = getByText("Start by syncing your cloud storage to contiq");
    expect(subheading).toBeInTheDocument();
  });
});
