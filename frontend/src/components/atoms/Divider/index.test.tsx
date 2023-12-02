import CustomDivider from ".";
import { render, screen } from "@testing-library/react";
describe("avatarTest", () => {
  test("should render divider correctly", () => {
    render(<CustomDivider />);
    const dividerElement = screen.getByTestId("Divider");
    expect(dividerElement).toBeInTheDocument();
  });
  test("should render text content", () => {
    const textContent = "Or";
    render(<CustomDivider>{textContent}</CustomDivider>);
    const textElement = screen.getByText(textContent);
    expect(textElement).toBeInTheDocument();
  });
});
