import React from 'react';
import ResetPassword from '.';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter} from "react-router-dom";
describe("Reset Password Component Test Case",()=>{

    test('reset password form validation and button functionality', () => {
        render(<BrowserRouter><ResetPassword /></BrowserRouter>);
        const emailInput = screen.getByPlaceholderText('john@example.com');
        expect(screen.queryByText('email should constraint to validation')).toBeNull();
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(screen.getByText('Send'));
        expect(screen.getByText('email should constraint to validation')).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'ab@gmail.com' } });
        fireEvent.click(screen.getByText('Send'));

      });
})
