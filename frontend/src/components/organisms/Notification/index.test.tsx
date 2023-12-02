import { fireEvent, render, screen } from "@testing-library/react";
import NotificationBox from ".";

describe("Notification Box ", () => {
  const Notifications = [
    {
      id: 1,
      avatar: "avatar1",
      userName: "User1",
      message: "uploaded data",
      time: "5 pm",
    },
  ];
  test("Notifications render correctly", () => {
    const handleShowNotifications = jest.fn();
    const handleCloseNotifications = jest.fn();
    render(
      <NotificationBox
        notifications={Notifications}
        handleCloseNotifications={handleCloseNotifications}
        handleShowNotifications={handleShowNotifications}
        showNotifications={true}
      />
    );
    const open = screen.getByAltText("notification");
    fireEvent.click(open);
    const close = screen.getByAltText("closeIcon");
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(close).toBeInTheDocument();
    expect(screen.getAllByTestId("notification")).toHaveLength(1);
    fireEvent.click(close);
    expect(handleCloseNotifications).toBeCalled();
  });
});
