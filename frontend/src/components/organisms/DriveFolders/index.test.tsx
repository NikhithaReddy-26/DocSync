import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import DriveFolders from "."; 
import { DRIVE_FILES } from "../../../utils/constants";


describe("DriveFolders Component", () => {
  it("renders the component with folder list", () => {
    render(<DriveFolders driveFiles={DRIVE_FILES} />);
    expect(screen.getByText("Zemoso decks")).toBeInTheDocument();
    const folderItems = screen.getAllByTestId("listItem");
    expect(folderItems).toHaveLength(3)
    fireEvent.click(folderItems[0]);
    const files=screen.getAllByText("Zemoso decks")as HTMLElement[]
    expect(files[0]).toBeInTheDocument();
  });

  it("handles checkbox clicks", () => {
    const {container}=render(<DriveFolders driveFiles={DRIVE_FILES} />);
    expect(screen.getByText("Zemoso decks")).toBeInTheDocument();
    const folderItems = screen.getAllByTestId("listItem");
    fireEvent.click(folderItems[0]);
    const checkbox = container.querySelectorAll("input[type='checkbox']");;
    expect(checkbox[0]).not.toBeChecked();
    fireEvent.click(checkbox[0]);
    expect(checkbox[0]).toBeChecked()
  });

  it("handles 'Back' button click", () => {
    render(<DriveFolders driveFiles={DRIVE_FILES} />);
    const folderItems = screen.getAllByTestId("listItem");
    fireEvent.click(folderItems[0]);
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);
    expect(screen.getByText("Zemoso decks")).toBeInTheDocument();
    const closeIcon=screen.getByAltText("close");
    fireEvent.click(closeIcon);
    expect(screen.getByText("Choose the folders to sync with contiq")).toBeInTheDocument();
  });

  it("handles 'Sync' button disable state", () => {
    const {container}=render(<DriveFolders driveFiles={DRIVE_FILES} />);
    expect(screen.getByText("Zemoso decks")).toBeInTheDocument();
    const folderItems = screen.getAllByTestId("listItem");
    fireEvent.click(folderItems[0]);
    const checkbox = container.querySelectorAll("input[type='checkbox']");;
    expect(checkbox[0]).not.toBeChecked();
    const syncButton = screen.getByText("Sync");
    expect(syncButton).toBeDisabled();
    fireEvent.click(checkbox[0]);
    expect(syncButton).not.toBeDisabled();
  });
});
