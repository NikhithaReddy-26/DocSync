import { render, screen } from "@testing-library/react";
import Notification from ".";

describe("Notification Bar", () => {
  test("notification renders correctly", () => {
    const avatar = "../../../../public/assets/icons/avatar.svg";
    render(
      <Notification
        avatarSrc={avatar}
        avatarAlt={"Avatar"}
        notificationMessage="User"
      />
    );
    const avatarTest = screen.getByRole("img");
    expect(avatarTest).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
