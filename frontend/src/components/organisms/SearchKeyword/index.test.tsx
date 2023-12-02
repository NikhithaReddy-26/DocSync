import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchByKeyword from ".";
import { searchKeywordResults } from "../../../utils/constants";

test("test should render the component successfully", () => {
  const fetchResult = jest.fn();
  render(<SearchByKeyword fetchResult={fetchResult}></SearchByKeyword>);
  const searchKeyword = screen.getByTestId("searchKeyword");
  expect(searchKeyword).toBeInTheDocument();
});

test("test should not render the search element until input length is >= 3", async () => {
  const mockedFetchResult = async (keyword: string) => {
    return searchKeywordResults;
  };
  render(<SearchByKeyword fetchResult={mockedFetchResult}></SearchByKeyword>);
  const searchKeyword = screen.getByTestId("searchKeyword");
  expect(searchKeyword).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Search");
  fireEvent.change(input, { target: { value: "tt" } });

  await waitFor(() => {
    const result = screen.getByAltText("other-document-1");
    expect(result).toBeInTheDocument();
  });
});

test("test should render the search element successfully", async () => {
  const mockedFetchResult = async (keyword: string) => {
    return searchKeywordResults;
  };
  render(<SearchByKeyword fetchResult={mockedFetchResult}></SearchByKeyword>);
  const searchKeyword = screen.getByTestId("searchKeyword");
  expect(searchKeyword).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Search");
  fireEvent.change(input, { target: { value: "test" } });
});

test("test should render the card on focus and hide it on blur", async () => {
  const mockedFetchResult = async (keyword: string) => {
    return searchKeywordResults;
  };
  render(<SearchByKeyword fetchResult={mockedFetchResult}></SearchByKeyword>);
  const searchKeyword = screen.getByTestId("searchKeyword");
  expect(searchKeyword).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Search");
  fireEvent.focus(input);
  fireEvent.blur(input);
});
