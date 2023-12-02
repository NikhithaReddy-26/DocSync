import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '.';

describe('Modal component', () => {
  it('renders correctly when open is true', () => {
    render(
      <Modal open={true}>
        <p>Modal Content</p>
      </Modal>
    );
  });

  it('renders correctly when open is false', () => {
    render(
      <Modal open={false}>
        <p>Modal Content</p>
      </Modal>
    );
  });

  it('triggers onClose when backdrop is clicked', () => {
    const handleClose = jest.fn();

    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalled();
  });

  it('does not trigger onClose when modal content is clicked', () => {
    const handleClose = jest.fn();

    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const modalContent = screen.getByText('Modal Content');
    fireEvent.click(modalContent);

    expect(handleClose).not.toHaveBeenCalled();
  });
});
