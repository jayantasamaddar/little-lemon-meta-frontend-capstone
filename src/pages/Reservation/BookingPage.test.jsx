import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BookingPage } from './BookingPage';

describe('components/BookingPage', () => {
  describe('<BookingPage />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      );
      const HeadingEl = screen.getByText('Reservation Details');
      expect(HeadingEl).toBeInTheDocument();
    });
  });
});
