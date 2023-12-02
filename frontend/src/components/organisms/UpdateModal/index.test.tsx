import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateModal, { UpdateModalProps } from '.';


const mockHandleCancel = jest.fn();
const mockHandleUpload = jest.fn();

const defaultProps: UpdateModalProps = {
  handleCancel: mockHandleCancel,
  handleUpload: mockHandleUpload,
  pdfName: 'example.pdf',
  isOpen: true,
};

describe('UpdateModal', () => {

  it('calls handleCancel when cancel button is clicked', () => {
    render(<UpdateModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
  });
  it('calls handleUpload when upload button is clicked', () => {
    render(<UpdateModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Upload'));
  });
});
