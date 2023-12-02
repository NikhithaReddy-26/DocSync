import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from ".";
import Avatar from "../../../../public/assets/icons/avatar.svg";
import { act } from "react-dom/test-utils";
import { BrowserRouter} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}));
test("test should render header successfully", () => {
  const fetchResult = jest.fn((keyword) => Promise.resolve([]));

  render(
   <BrowserRouter> <Header
      userId={"IDJR00292"}
      userName={"John Ross"}
      avatarSrc={Avatar}
      fetchResults={fetchResult}
    /></BrowserRouter>
  );
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
});

test("test should render header input value", () => {
  const fetchResult = jest.fn((keyword) => Promise.resolve([]));

  render(
    <BrowserRouter> <Header
    userId={"IDJR00292"}
    userName={"John Ross"}
    avatarSrc={Avatar}
    fetchResults={fetchResult}
  /></BrowserRouter>
  );
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Search");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "test" } });
  const otherDocument = screen.getByAltText("other-document-1");
  expect(otherDocument).toBeInTheDocument();
});

test("test should render header and click on notification and render notification", () => {
  const fetchResult = jest.fn((keyword) => Promise.resolve([]));

  render(
    <BrowserRouter> <Header
    userId={"IDJR00292"}
    userName={"John Ross"}
    avatarSrc={Avatar}
    fetchResults={fetchResult}
  /></BrowserRouter>
  );
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();

  const notification = screen.getByAltText("notification");
  expect(notification).toBeInTheDocument();

  fireEvent.click(notification);
  const notificationTitle = screen.getByText("Notifications");
  expect(notificationTitle).toBeInTheDocument();
});

test("test should render header and click on avatar", async () => {
  const fetchResult = jest.fn((keyword) => Promise.resolve([]));
  const handleLogOut = jest.fn();
  render(
    <BrowserRouter> <Header
      userId={"IDJR00292"}
      userName={"John Ross"}
      avatarSrc={Avatar}
      fetchResults={fetchResult}
    /></BrowserRouter>
  );
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();

  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();

  fireEvent.click(avatar);
  const logout = screen.getByText("Logout");
  expect(logout).toBeInTheDocument();

  fireEvent.click(avatar);

  const notification = screen.getByAltText("notification");
  fireEvent.click(notification);

  fireEvent.click(screen.getByAltText("closeIcon"));

  const avatarButton = screen.getByTestId("avatarButton");
  waitFor(() => {
    expect(avatarButton).toBeInTheDocument();
    avatarButton.focus();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    avatarButton.blur();
    expect(logout).not.toBeInTheDocument();
  });
 });
 test('should call handleLogout when logout button is clicked', async () => {
  const fetchResult = jest.fn((keyword) => Promise.resolve([]));
  const { getByTestId } = render(
    <BrowserRouter> <Header
    userId={"IDJR00292"}
    userName={"John Ross"}
    avatarSrc={Avatar}
    fetchResults={fetchResult}
  /></BrowserRouter>
  );
  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
  fireEvent.click(avatar);
  const logoutButton =screen.getByText('Logout');
  fireEvent.click(logoutButton);
  expect(useAuth0().logout).toHaveBeenCalledTimes(0);
});
