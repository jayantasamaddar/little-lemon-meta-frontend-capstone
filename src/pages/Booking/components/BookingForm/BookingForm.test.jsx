import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BookingForm } from './BookingForm';

describe('components/BookingForm', () => {
  describe('<BookingForm />', () => {
    it('Rendered in the DOM', () => {
      render(<BookingForm />);
      const BookingFormEl = screen.getByTestId('reservation-form');
      expect(BookingFormEl).toBeInTheDocument();
    });

    it('Update form fields and Form Submission is working', () => {
      const dummyData = {
        firstName: 'John',
        lastName: 'Doe',
        bookingDate: '2023-02-28',
        bookingTime: '18:00',
        guests: '5',
        occasion: 'birthday',
      };
      const mockSubmit = jest.fn();
      render(<BookingForm onSubmit={mockSubmit} />);

      const firstName = screen.getByLabelText('First Name');
      const lastName = screen.getByLabelText('Last Name');
      const bookingDate = screen.getByLabelText('Booking Date');
      const bookingTime = screen.getByLabelText('Booking Time');
      const guests = screen.getByLabelText('Number of Guests');
      const occasion = screen.getByLabelText('Occasion');

      /** Fire change events */
      fireEvent.change(firstName, { target: { value: dummyData.firstName } }); // Changed First Name
      fireEvent.change(lastName, { target: { value: dummyData.lastName } }); // Changed Last Name
      fireEvent.change(bookingDate, {
        target: { value: dummyData.bookingDate },
      }); // Changed Booking Date
      fireEvent.change(bookingTime, {
        target: { value: dummyData.bookingTime },
      }); // Changed Booking Time
      fireEvent.change(guests, { target: { value: dummyData.guests } }); // Changed Guests
      userEvent.selectOptions(occasion, dummyData.occasion); // Occasions

      /** Change Event updated input fields */
      expect(firstName).toHaveAttribute('value', dummyData.firstName);
      expect(lastName).toHaveAttribute('value', dummyData.lastName);
      expect(bookingDate).toHaveAttribute('value', dummyData.bookingDate);
      expect(bookingTime).toHaveAttribute('value', dummyData.bookingTime);
      expect(guests).toHaveAttribute('value', dummyData.guests);
      expect(screen.getByRole('option', { name: 'Birthday' }).selected).toBe(
        true
      );

      fireEvent.click(screen.getByRole('button')); // Click Submit Button
      expect(mockSubmit).toHaveBeenCalledTimes(1); // Expect submit function call once.
    });
  });
});
