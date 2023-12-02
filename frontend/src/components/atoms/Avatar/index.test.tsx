import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Avatar from ".";
import React from "react";

describe("avatarTest", () => {
  test("avatar renders correctly", () => {
    const onClickMock = jest.fn();
    render(<Avatar src="src" alt="ContiqAvatar" onClick={onClickMock} />);
    const avatarTest1 = screen.getByAltText("ContiqAvatar");
    expect(avatarTest1).toBeInTheDocument();
    fireEvent.click(avatarTest1);
    expect(onClickMock).toHaveBeenCalled();
  });
});
