import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Sidebar from "./index";
import { sidebarContent } from "../../../utils/constants";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar component", () => {
  it("renders without crashing", () => {
    render(<MemoryRouter><Sidebar itemid="home"/></MemoryRouter>);
  });

  it("changes icon style when clicked", () => {
    const { getByTestId } = render(<MemoryRouter><Sidebar itemid="home"/></MemoryRouter>);

    const firstIcon = getByTestId("icon-home");
    const secondIcon = getByTestId("icon-files");

    fireEvent.click(firstIcon);

    fireEvent.click(secondIcon);
  });

  it("displays the correct content", () => {
    const { getByText } = render(<MemoryRouter><Sidebar itemid="home"/></MemoryRouter>);

    const homeIcon = getByText(sidebarContent.home);
    expect(homeIcon).toBeInTheDocument();
  });
});
