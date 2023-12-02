import React from "react";
import ProfileInfo from ".";
import { render, fireEvent, screen } from "@testing-library/react";

describe("ProfileInfo Component", () => {
  it("renders username and userId", () => {
    render(<ProfileInfo username="John Ross" userId="IDJR00292" />);
    expect(screen.getByText("John Ross")).toBeInTheDocument();
    expect(screen.getByText("IDJR00292")).toBeInTheDocument();
  });

  it("calls handleLogout when the third item is clicked", () => {
    const handleLogoutMock = jest.fn();
    const { getByText } = render(
      <ProfileInfo
        username="John Ross"
        userId="IDJR00292"
        handleLogout={handleLogoutMock}
      />
    );
   fireEvent.click(getByText("Logout"));
   expect(handleLogoutMock).toHaveBeenCalled();
  });

  it("does not call handleLogout when items other than thelogout is clicked", () => {
    const handleLogoutMock = jest.fn();
    render(
      <ProfileInfo
        username="John Ross"
        userId="IDJR00292"
        handleLogout={handleLogoutMock}
      />
    );
    fireEvent.click(screen.getByText("Profile"));
    fireEvent.click(screen.getByText("Settings"));

    expect(handleLogoutMock).not.toHaveBeenCalled();
  });
});
