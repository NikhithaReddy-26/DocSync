import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import LandingPage from ".";
import { BrowserRouter } from "react-router-dom";
jest.mock("axios");
import * as services from "../../services/auth";
import { passwordConstant } from "../../utils/constants";

jest.mock("../../services/auth", () => ({
  registerUser: jest.fn(() => Promise.resolve({ data: [] })),
  getAllUsers: jest.fn(() => Promise.resolve({ data: [] })),
  getUserByEmail: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          fullname: "John Doe",
          email: "john@gmail.com",
          password: "JohnDoe@001",
        },
      ],
    })
  ),
}));

describe("LandingPage", () => {
  const mockFileData = [
    {
      id: 1,
      name: "Sample File 1",
      path: "/sample/file1.pdf",
      createdOn: "2023-09-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Sample File 2",
      path: "/sample/file2.pdf",
      createdOn: "2023-08-25T00:00:00Z",
    },
    {
      id: 3,
      name: "Sample File 3",
      path: "/sample/file3.pdf",
      createdOn: "2023-09-05T00:00:00Z",
    },
  ];

  beforeAll(() => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockFileData } as any);
  });
  test("renders LandingPage component with data", async () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    await waitFor(async () => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
  });
  test("handles error when fetching files", async () => {
    jest
      .spyOn(axios, "get")
      .mockRejectedValue(new Error("Failed to fetch files"));

    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  });

  test("fetchResults function returns an empty array", async () => {
    const mockFetchResults = jest.fn(async () => []);
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
    await mockFetchResults();
  });
});
