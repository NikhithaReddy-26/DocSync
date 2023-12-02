import React from "react";
import ProgressBar from ".";
import { act, render } from "@testing-library/react";


describe("ProgressBar", () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  test("renders Loader by default", () => {
    const { getByTestId } = render(<ProgressBar />);
    const loaderElement = getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders Spinner when progressVariant is "spinner"', () => {
    const { getByTestId } = render(<ProgressBar progressVariant="spinner" />);
    const spinnerElement = getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test('renders NotificationLoader when progressVariant is "notification"', () => {
    const { getByTestId } = render(
      <ProgressBar progressVariant="notification" />
    );
    const notificationLoaderElement = getByTestId("notification-loader");
    expect(notificationLoaderElement).toBeInTheDocument();
  });

  test("updates progress over time", () => {
    const { getByTestId } = render(<ProgressBar />);
    const progressBar = getByTestId("loader");
    const initialProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(initialProgress).toBe(10);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    const updatedProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(updatedProgress).toBe(20);
    act(() => {
      jest.advanceTimersByTime(1600);
    });
    const finalProgress = Number(progressBar.getAttribute("aria-valuenow"));
    expect(finalProgress).toBe(100);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const afterFinalProgress = Number(
      progressBar.getAttribute("aria-valuenow")
    );
    expect(afterFinalProgress).toBe(100);
  });
});

