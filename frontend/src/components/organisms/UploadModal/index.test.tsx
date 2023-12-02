import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { UploadModal } from ".";

jest.mock("../../../services/files/api", () => ({
  getFileLists: jest.fn().mockResolvedValue({
    status: 200,
    data: [...defaultfiles],
  }),
  postLocalFile: jest.fn(),
  updateLocalFile: jest.fn(),
}));
const defaultfiles = [
  {
    name: "sample.pdf",
    type: "application/pdf",
    path: "sample.pdf",
    uploadDate: "2023-09-04T09:41:46.238Z",
    id: 4,
  },
];
describe("UploadModal component", () => {
  it("renders without errors", () => {
    const { getByText, getByTestId } = render(<UploadModal />);

    expect(getByText("Add Files")).toBeInTheDocument();
    expect(getByTestId("upload-modal")).toBeInTheDocument();
  });

  it("opens the modal when the 'Add Files' button is clicked", () => {
    const { getByText, getByTestId } = render(<UploadModal />);

    const addFilesButton = getByText("Add Files");
    fireEvent.click(addFilesButton);

    const modal = getByTestId("upload-modal");
    expect(modal).toHaveStyle("display: block");
  });

  it("closes the modal when the close icon is clicked", () => {
    const { getByText, getByTestId } = render(<UploadModal />);

    const addFilesButton = getByText("Add Files");
    fireEvent.click(addFilesButton);

    const modal = getByTestId("upload-modal");
    const closeIcon = getByTestId("close");
    fireEvent.click(closeIcon);

    expect(modal).toHaveStyle("display: block");
  });

  it("switches to 'Cloud Storage' tab when the tab is clicked", () => {
    const { getByText, getByTestId } = render(<UploadModal />);

    const addFilesButton = getByText("Add Files");
    fireEvent.click(addFilesButton);

    const cloudStorageTab = getByText("Cloud Storage");
    fireEvent.click(cloudStorageTab);

    const selectedTab = getByText("Cloud Storage");
    expect(selectedTab).toBeInTheDocument();
  });

  it("navigates to another component when 'Upload Files' tab is active and files are selected", async () => {
    const { getByText, getByTestId } = render(<UploadModal />);

    const addFilesButton = getByText("Add Files");
    fireEvent.click(addFilesButton);

    const uploadFilesTab = getByText("Upload Files");
    fireEvent.click(uploadFilesTab);

    const chooseFileButton = getByText("Choose files");
    fireEvent.click(chooseFileButton);

    const pdfFile = new File(["PDF file content"], "example.pdf", {
      type: "application/pdf",
    });

    const fileInput = getByTestId("file-input");
    fireEvent.change(fileInput, {
      target: {
        files: [pdfFile],
      },
    });

    const navigateButton = await screen.findByText("Upload File");

    fireEvent.click(navigateButton);
    const uploadModal = getByTestId("upload-modal");
    expect(uploadModal).toHaveStyle("display: block");

    const selectedFiles = getByTestId("selected-files");
    expect(selectedFiles.textContent).toContain(" Drop your files here");
  });
  it("calls handleLeftArrowClick when the left arrow icon is clicked", () => {
    const handleLeftArrowClickMock = jest.fn();

    const { getByText, getByTestId } = render(<UploadModal />);

    const addFilesButton = getByText("Add Files");
    fireEvent.click(addFilesButton);

    const leftArrowIcon = getByTestId("left-arrow-icon");

    leftArrowIcon.onclick = handleLeftArrowClickMock;

    fireEvent.click(leftArrowIcon);
  });
 });
