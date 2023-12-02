import React from 'react';
import ResetPasswordSuccess from '.';
import { fireEvent, render,screen } from '@testing-library/react';

describe('ResetPasswordSuccess', () => {
 
 it('renders the component', () => {
    const { getByText } = render(<ResetPasswordSuccess />);
    const headingElement = getByText('Password Reset');
    expect(headingElement).toBeInTheDocument();
  });

  it('displays the correct subheading', () => {
    const { getByText } = render(<ResetPasswordSuccess />);
    const subheadingElement = getByText('Your password has been successfully reset. Click below to login magically.');
    expect(subheadingElement).toBeInTheDocument();
  });

  it('displays the button with the correct text', () => {
    const { getByText } = render(<ResetPasswordSuccess />);
    const buttonElement = getByText('Continue');
    expect(buttonElement).toBeInTheDocument();
  });
  it("calls the handleClick function when the button is clicked", () => {
    const mockHandleClick = jest.fn();
   render(<ResetPasswordSuccess handleClick={mockHandleClick} />);
    const button = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
