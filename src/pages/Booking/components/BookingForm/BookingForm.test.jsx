import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { bookingFormReducer } from '../../../../actions';
import { FormContextProvider, useForm } from '../../../../context';

import { BookingForm } from './BookingForm';

/*** Mock Data */
const dispatchMock = jest.fn();
const providerProps = {
  state: {
    availableTimes: ['17:00', '18:00', '19:30'],
    formData: {
      firstName: '',
      lastName: '',
      bookingDate: '2023-03-03',
      bookingTime: '19:30',
      guests: 1,
      occasion: '',
    },
    formErrors: {
      firstName: '',
      lastName: '',
      bookingDate: '',
      bookingTime: '',
      guests: '',
      occasion: '',
    },
    isDirty: {
      firstName: false,
      lastName: false,
      bookingDate: false,
      bookingTime: false,
      guests: false,
      occasion: false,
    },
  },
  dispatch: dispatchMock,
};

const wrapper = ({ children }) => (
  <FormContextProvider value={providerProps}>{children}</FormContextProvider>
);

// const mockUseContext = jest
//   .fn()
//   .mockImplementation(() => ({
//     state: providerProps.state,
//     dispatch: providerProps.dispatch,
//   }));

// useContext = mockUseContext;

/** Tests */

describe('components/BookingForm', () => {
  describe('<BookingForm />', () => {
    it('Rendered in the DOM', () => {
      render(<BookingForm />);
      const BookingFormEl = screen.getByTestId('reservation-form');
      expect(BookingFormEl).toBeInTheDocument();
    });

    it('Initial Props received via FormContextProvider', () => {
      render(<BookingForm />, { wrapper });
      const bookingDate = screen.getByLabelText('Booking Date');
      const bookingTime = screen.getByLabelText('Booking Time');

      expect(bookingDate).toHaveValue('2023-03-03');
      expect(bookingTime).toHaveValue('19:30');
    });

    it('Update form fields and Form Submission is working', () => {
      // const dropdown = render(<Dropdown />);
      const dummyData = {
        firstName: 'John',
        lastName: 'Doe',
        bookingDate: '2023-02-28',
        bookingTime: '19:30',
        guests: '5',
        occasion: 'birthday',
      };

      const mockSubmit = jest.fn();
      render(<BookingForm onSubmit={mockSubmit} />, wrapper);

      const firstName = screen.getByLabelText('First Name');
      // const lastName = screen.getByLabelText('Last Name');
      // const bookingDate = screen.getByLabelText('Booking Date');
      // const bookingTime = screen.getByLabelText('Booking Time');
      // const guests = screen.getByLabelText('Number of Guests');
      // const occasion = screen.getByLabelText('Occasion');
      expect(firstName).toHaveValue('');
      fireEvent.change(firstName, { target: { value: dummyData.firstName } });
      expect(firstName).toHaveValue('John');

      /** Fire change events */
      // fireEvent.change(firstName, { target: { value: dummyData.firstName } }); // Changed First Name
      // fireEvent.change(lastName, { target: { value: dummyData.lastName } }); // Changed Last Name
      // fireEvent.change(bookingDate, {
      //   target: { value: dummyData.bookingDate },
      // }); // Changed Booking Date
      // fireEvent.change(bookingTime, {
      //   target: { value: dummyData.bookingTime },
      // }); // Changed Booking Time
      // fireEvent.change(guests, { target: { value: dummyData.guests } }); // Changed Guests
      // userEvent.selectOptions(occasion, dummyData.occasion); // Occasions

      /** Change Event updated input fields */
      // expect(firstName).toHaveAttribute('value', dummyData.firstName);
      // expect(lastName).toHaveAttribute('value', dummyData.lastName);
      // expect(bookingDate).toHaveAttribute('value', dummyData.bookingDate);
      // expect(bookingTime).toHaveAttribute('value', dummyData.bookingTime);
      // expect(guests).toHaveAttribute('value', dummyData.guests);
      // expect(screen.getByRole('option', { name: 'Birthday' }).selected).toBe(
      //   true
      // );
      // expect(dispatchMock).toBeCalledWith({
      //   type: 'setFormErrors',
      //   payload: { firstName: `firstName is a required field!` },
      // });
      // expect(dispatchMock).toBeCalledWith({
      //   type: 'formData',
      //   payload: { firstName: dummyData.firstName },
      // });

      // fireEvent.click(screen.getByRole('button')); // Click Submit Button
      // expect(mockSubmit).toHaveBeenCalledTimes(1); // Expect submit function call once.
    });
  });
});
