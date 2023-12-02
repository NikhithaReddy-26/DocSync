import { fireEvent, render, screen } from "@testing-library/react";
import SearchResult from ".";

const searchResults = [
  {
    id: 1,
    fileName: "Company Agreement",
    description:
      "Since being established in 1908 as a sewing machine repair business, the brother group has pursued the diversification and globalization of business in its history of more...",
    foundOn: 1,
    totalSlide: 5,
  },
  {
    id: 2,
    fileName: "Contract",
    description:
      "Since being a sewing machine repair business, the brother group has pursued the diversification of business in its history of more...",
    foundOn: 2,
    totalSlide: 3,
  },
];

test("test should render search result organism", () => {
  render(
    <SearchResult
      searchedText="Repair business"
      searchResults={searchResults}
    />
  );
  const searchResultOrganism = screen.getByTestId("searchResultCard");
  expect(searchResultOrganism).toBeInTheDocument();
});

test("test should render empty search result organism", () => {
  render(<SearchResult searchedText="Repair business" searchResults={[]} />);
  const searchResultOrganism = screen.getByTestId("searchResultCard");
  expect(searchResultOrganism).toBeInTheDocument();
});

test("test should render search result organism and click on next and previous icons", () => {
  render(
    <SearchResult
      searchedText="Repair business"
      searchResults={searchResults}
    />
  );
  const searchResultOrganism = screen.getByTestId("searchResultCard");
  expect(searchResultOrganism).toBeInTheDocument();
  const result = screen.getByText("Company Agreement", { exact: false });
  expect(result).toBeInTheDocument();

  const nextButton = screen.getByAltText("down-arrow");
  fireEvent.click(nextButton);

  const nextResult = screen.getByText("Contract", { exact: false });
  expect(nextResult).toBeInTheDocument();
  expect(result).not.toBeInTheDocument();

  fireEvent.click(nextButton);

  const prevButton = screen.getByAltText("up-arrow");
  fireEvent.click(prevButton);

  expect(
    screen.getByText("Company Agreement", { exact: false })
  ).toBeInTheDocument();
  expect(nextResult).not.toBeInTheDocument();

  fireEvent.click(prevButton);
});

test("test should render search result organism and toggle result on minimize and restore", () => {
  render(
    <SearchResult
      searchedText="Repair business"
      searchResults={searchResults}
    />
  );
  const searchResultOrganism = screen.getByTestId("searchResultCard");
  expect(searchResultOrganism).toBeInTheDocument();

  const result = screen.getByText("Company Agreement", { exact: false });
  expect(result).toBeInTheDocument();
  const toggleDisplayButton = screen.getByAltText("toggle-display-icon");
  fireEvent.click(toggleDisplayButton);
  expect(result).not.toBeInTheDocument();
});

test("test should render search result organism and copy description", () => {
  const clipboardMock = {
    writeText: jest.fn(),
  };
  Object.defineProperty(navigator, "clipboard", {
    value: clipboardMock,
    writable: true,
  });
  render(
    <SearchResult
      searchedText="Repair business"
      searchResults={searchResults}
    />
  );
  const searchResultOrganism = screen.getByTestId("searchResultCard");
  expect(searchResultOrganism).toBeInTheDocument();

  const copyButton = screen.getByAltText("copy-icon");
  fireEvent.click(copyButton);

  expect(clipboardMock.writeText).toBeCalled();

  const closeButton = screen.getByAltText("close-icon");
  fireEvent.click(closeButton);
});
