/* eslint-disable testing-library/no-wait-for-side-effects */
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { BookingPage } from './BookingPage';

/*************************************************************************/
/*** Setup Mocks */
/*************************************************************************/

const dummyData = {
  firstName: 'John',
  lastName: 'Doe',
  bookingDate: '2023-02-28',
  bookingTime: '19:30',
  guests: '5',
  occasion: 'birthday',
};

/** Mock useNavigate */
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

/*****************************************************************************/
/** Begin Tests */
/*****************************************************************************/

describe('components/BookingPage', () => {
  describe('<BookingPage />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );
      const headingEl = screen.getByText('Reservation Details'); // Heading
      const progressEl = screen.getByRole('progressbar'); // ProgressBar
      const bookingPageHeroImg = screen.getByRole('img'); // Booking Page Hero image
      expect(headingEl).toBeInTheDocument();
      expect(bookingPageHeroImg).toBeInTheDocument();
      expect(progressEl).toHaveValue(50); // Progress Bar at Bookings Page
    });

    it('Back Button functionality', () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );
      const backButtonEl = screen.getByLabelText('Go Back'); // Back Button
      expect(backButtonEl).toBeInTheDocument();
      fireEvent.click(backButtonEl);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });

    it('Has a Hero image', () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('Submission works as intended', () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );

      const submitButtonEl = screen.getByRole('button', {
        name: 'View Availability',
      });

      expect(submitButtonEl).toBeInTheDocument();

      fireEvent.click(submitButtonEl);
    });
  });

  /*****************************************************************************/
  /** Submit form */
  /*****************************************************************************/
  describe('Submit the Form', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Test the Submit Button', async () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );

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
      expect(mockedUsedNavigate).toHaveBeenCalledWith('thank-you');
    });
  });
});
