import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MuiTabs from ".";
import theme from "../../../theme";

describe("MuiTabs component", () => {
  const tabNames = ["Tab 1", "Tab 2", "Tab 3"];
  const onSelectTabMock = jest.fn();
  const selectedTab = "Tab 1";

  it("should render the tabs with the provided tab names", () => {
    const { getByText } = render(
      <MuiTabs
        tabNames={tabNames}
        onSelectTab={onSelectTabMock}
        selectedTab={selectedTab}
      />
    );

    tabNames.forEach((name) => {
      const tabElement = getByText(name);
      expect(tabElement).toBeInTheDocument();
    });
  });

  it("should trigger onSelectTab when a tab is clicked", () => {
    const { getByText } = render(
      <MuiTabs
        tabNames={tabNames}
        onSelectTab={onSelectTabMock}
        selectedTab={selectedTab}
      />
    );

    const tabToClick = getByText("Tab 2");
    fireEvent.click(tabToClick);

    expect(onSelectTabMock).toHaveBeenCalledWith("Tab 2");
  });

  it("should have the active tab color when a tab is selected", () => {
    const { getByText } = render(
      <MuiTabs
        tabNames={tabNames}
        onSelectTab={onSelectTabMock}
        selectedTab={selectedTab}
        activeTabColor={theme.palette.primary[500]}
      />
    );

    const activeTab = getByText(selectedTab);
    expect(activeTab).toHaveStyle(`color: ${theme.palette.primary[500]}`);
  });
});
