/* eslint-disable testing-library/no-wait-for-side-effects */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  renderHook,
  waitFor,
} from '@testing-library/react';
import { FormContextProvider, useForm } from '../../../../context';

import { BookingForm } from './BookingForm';
import { loadInitialState } from '../../../../actions';
import { currentDateTime } from '../../../../utilities';

/*************************************************************************/
/*** Setup Mocks */
/*************************************************************************/
const state = loadInitialState();

const dummyData = {
  firstName: 'John',
  lastName: 'Doe',
  bookingDate: '2023-02-28',
  bookingTime: '19:30',
  guests: '5',
  occasion: 'birthday',
};

const mockDispatch = jest.fn();
const mockSubmit = jest.fn().mockImplementation(e => e.preventDefault());

const wrapper = ({ children }) => (
  <FormContextProvider value={{ state, dispatch: mockDispatch }}>
    {children}
  </FormContextProvider>
);

/*****************************************************************************/
/** Begin Tests */
/*****************************************************************************/
describe('components/BookingForm', () => {
  describe('<BookingForm />', () => {
    it('Rendered in the DOM', () => {
      render(<BookingForm />);
      const BookingFormEl = screen.getByRole('form');
      expect(BookingFormEl).toBeInTheDocument();
    });

    it('Initial Props received via FormContextProvider', () => {
      render(<BookingForm />, { wrapper });
      const bookingDate = screen.getByLabelText('Booking Date');
      const bookingTime = screen.getByLabelText('Booking Time');

      expect(bookingDate).toHaveValue(state.bookingDate);
      expect(bookingTime).toHaveValue(state.bookingTime);
    });
  });

  /*****************************************************************************/
  /** Change Event on Form Fields */
  /*****************************************************************************/
  describe('Changes to form fields are dispatched correctly to reflect state', () => {
    beforeEach(() => jest.clearAllMocks());

    /*****************************/
    /** Input type: Text  */
    /*****************************/
    describe('Test changes to Input type: text', () => {
      it('Test dispatch actions on field: firstName', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });
        const firstName = screen.getByLabelText('First Name');

        await waitFor(
          () => {
            fireEvent.change(firstName, {
              target: { value: dummyData.firstName },
            });
          },
          { timeout: 1 }
        );

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormData',
          payload: {
            firstName: dummyData.firstName,
          },
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: {
            firstName: '',
          },
        });
      });

      it('Test error dispatch when value is empty and field required', async () => {
        render(
          <FormContextProvider
            value={{
              state: {
                ...state,
                formData: { ...state.formData, firstName: dummyData.firstName },
              },
              dispatch: mockDispatch,
            }}
          >
            <BookingForm onSubmit={mockSubmit} />
          </FormContextProvider>
        );
        const firstName = screen.getByLabelText('First Name');

        await waitFor(
          () => {
            fireEvent.change(firstName, {
              target: { value: '' },
            }); // empty the field
          },
          { timeout: 1 }
        );

        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: {
            firstName: `firstName is a required field!`,
          },
        });
      });
    });

    /*****************************/
    /** Input type: Date  */
    /*****************************/
    describe('Test changes to Input type: date', () => {
      it('Test dispatch actions on field: bookingDate', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });
        const bookingDate = screen.getByLabelText('Booking Date');

        await waitFor(
          () => {
            fireEvent.change(bookingDate, {
              target: { value: dummyData.bookingDate },
            });
          },
          { timeout: 1 }
        );

        expect(mockDispatch).toHaveBeenCalledTimes(3);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setAvailableTimes',
          payload: new Date(dummyData.bookingDate),
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormData',
          payload: {
            bookingDate: dummyData.bookingDate,
          },
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: {
            bookingDate: '',
          },
        });
      });

      it('Test dispatch actions on bookingDate when date is older than current', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });
        const bookingDate = screen.getByLabelText('Booking Date');

        await waitFor(
          () => {
            fireEvent.change(bookingDate, {
              target: { value: currentDateTime(-1).date },
            });
          },
          { timeout: 1 }
        );

        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: {
            bookingDate: 'You need to book at least a day in advance',
          },
        });
      });
    });

    /*****************************/
    /** Booking Time  */
    /*****************************/
    it('Test dispatch actions on field: bookingTime', async () => {
      render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

      const bookingTime = screen.getByLabelText('Booking Time');

      await waitFor(
        () => {
          fireEvent.change(bookingTime, {
            target: { value: dummyData.bookingTime },
          });

          expect(mockDispatch).toHaveBeenCalledTimes(3);
        },
        { timeout: 1 }
      );

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setIsDirty',
        payload: {
          bookingTime: true,
        },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setFormData',
        payload: {
          bookingTime: dummyData.bookingTime,
        },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setFormErrors',
        payload: {
          bookingTime: '',
        },
      });
    });

    /*****************************/
    /** Input type: Number  */
    /*****************************/
    describe('Test changes to Input type: number', () => {
      it('Test dispatch actions on field: guests', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

        const guests = screen.getByLabelText('Number of Guests');

        await waitFor(
          () => {
            fireEvent.change(guests, {
              target: { value: dummyData.guests },
            });

            expect(mockDispatch).toHaveBeenCalledTimes(2);
          },
          { timeout: 1 }
        );

        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormData',
          payload: {
            guests: dummyData.guests,
          },
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: {
            guests: '',
          },
        });
      });

      it('Test dispatch on empty number field', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

        const guests = screen.getByLabelText('Number of Guests');
        const min = guests.getAttribute('min');
        const max = guests.getAttribute('max');
        const name = guests.getAttribute('name');

        await waitFor(() => {
          fireEvent.change(guests, { target: { value: '' } });
        });

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormErrors',
          payload: { guests: `Limit: ${min} - ${max} ${name}.` },
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'setFormData',
          payload: { guests: '' },
        });
      });

      it('Test attempted changeEvent for number outside min-max range', async () => {
        render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

        const guests = screen.getByLabelText('Number of Guests');

        await waitFor(() => {
          fireEvent.change(guests, { target: { value: '1000' } });
        });
        expect(mockDispatch).not.toBeCalled();
      });
    });

    /*****************************/
    /** Occasion  */
    /*****************************/
    it('Test dispatch actions on field: occasion', async () => {
      render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

      const occasion = screen.getByLabelText('Occasion');

      await waitFor(
        () => {
          fireEvent.change(occasion, {
            target: { value: dummyData.occasion },
          });

          expect(mockDispatch).toHaveBeenCalledTimes(3);
        },
        { timeout: 1 }
      );

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setIsDirty',
        payload: {
          occasion: true,
        },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setFormData',
        payload: {
          occasion: dummyData.occasion,
        },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setFormErrors',
        payload: {
          occasion: '',
        },
      });
    });
  });

  /*****************************************************************************/
  /** Submit form */
  /*****************************************************************************/
  describe('Submit the Form', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Test the Submit Button', async () => {
      render(<BookingForm onSubmit={mockSubmit} />, { wrapper });

      const firstName = screen.getByLabelText('First Name');
      const lastName = screen.getByLabelText('Last Name');
      const bookingDate = screen.getByLabelText('Booking Date');
      const bookingTime = screen.getByLabelText('Booking Time');
      const guests = screen.getByLabelText('Number of Guests');
      const occasion = screen.getByLabelText('Occasion');

      await waitFor(
        () => {
          fireEvent.change(firstName, {
            target: { value: dummyData.firstName },
          });
          fireEvent.change(lastName, {
            target: { value: dummyData.lastName },
          });
          fireEvent.change(bookingDate, {
            target: { value: dummyData.bookingDate },
          });
          fireEvent.change(bookingTime, {
            target: { value: dummyData.bookingTime },
          });
          fireEvent.change(guests, {
            target: { value: dummyData.guests },
          });
          fireEvent.change(occasion, {
            target: { value: dummyData.occasion },
          });
        },
        { timeout: 1 }
      );

      // Click Submit Button
      await waitFor(() =>
        fireEvent.submit(
          screen.getByRole('button', { name: 'View Availability' })
        )
      );

      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1)); // Expect submit function call once.
    });
  });

  /*****************************************************************************/
  /** Blur Event on Form Fields */
  /*****************************************************************************/

  describe('Blur events are dispatched correctly to reflect errors', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Test dispatch on dirty, required field', async () => {
      render(<BookingForm onSubmit={mockSubmit} />, { wrapper });
      const firstName = screen.getByLabelText('First Name');

      await waitFor(() => {
        fireEvent.focusIn(firstName);
        // Make field dirty
        fireEvent.focusOut(firstName);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'setFormErrors',
        payload: { firstName: 'firstName is a required field!' },
      });
    });
  });

  /*****************************************************************************/
  /** Render the useForm hook correctly */
  /*****************************************************************************/
  describe('Render useForm() correctly', () => {
    it('Should return the state and mockDispatch correctly', () => {
      const mockUseContext = jest.fn().mockImplementation(() => ({
        state,
        mockDispatch,
      }));

      React.useContext = mockUseContext;
      render(<BookingForm />, { wrapper });
      const { result } = renderHook(() => useForm());

      expect(result.current).toEqual({ state, mockDispatch });
      expect(result.current.state.formData.bookingDate).toBe(
        state.formData.bookingDate
      );
    });
  });
});
