import React from "react";
import { render, screen} from "@testing-library/react";
import SyncProgressMolecule, { SyncProgressMoleculeProps } from ".";
import { GoogleDriveSyncConstants } from "../../../utils/constants";

const mockOnClose = jest.fn();
const defaultProps: SyncProgressMoleculeProps = {
  openModal: true,
  onClose: mockOnClose,
};

describe("SyncProgressMolecule", () => {
  it("renders the component with the modal open", () => {
    render(<SyncProgressMolecule {...defaultProps} />);
    const closeButton = screen.getByAltText("CloseModal");
    expect(closeButton).toBeInTheDocument();
  });

  it("displays the progress text", () => {
    render(<SyncProgressMolecule {...defaultProps} />);
    const progressText = screen.getByText(
      GoogleDriveSyncConstants.progressText
    );
    expect(progressText).toBeInTheDocument();
  });
  it("closes the modal after a delay", async () => {
    render(<SyncProgressMolecule {...defaultProps} />);
    expect(mockOnClose).not.toHaveBeenCalled(); 
    await new Promise((resolve) => setTimeout(resolve, 3000));
  });
});
