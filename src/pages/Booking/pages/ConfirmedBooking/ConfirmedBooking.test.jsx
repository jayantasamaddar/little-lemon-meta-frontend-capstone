import { screen, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { BookingPage } from '../../BookingPage';

import { ConfirmedBooking } from './ConfirmedBooking';

/*************************************************************************/
/*** Setup Mocks */
/*************************************************************************/

const context = {
  data: {
    booking_id: '1944ce634a44e7',
    firstName: 'John',
    lastName: 'Doe',
    bookingDate: '2023-02-28',
    bookingTime: '19:30',
    guests: '5',
    occasion: 'birthday',
  },
  stage: 'Thank You',
};

const RenderRouteWithOutletContext = ({ context, children }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </MemoryRouter>
  );
};

/*****************************************************************************/
/** Begin Tests */
/*****************************************************************************/
describe('components/ConfirmedBooking', () => {
  describe('<ConfirmedBooking />', () => {
    it('Renders Correctly', () => {
      render(
        <RenderRouteWithOutletContext context={context}>
          <ConfirmedBooking />
        </RenderRouteWithOutletContext>
      );

      const headingEl = screen.getByText('Booking Confirmed'); // Heading
      expect(headingEl).toBeInTheDocument();
    });

    it('Does not Render when stage is not Thank You', async () => {
      render(
        <RenderRouteWithOutletContext
          context={{ ...context, stage: 'Reservation Details' }}
        >
          <ConfirmedBooking />
        </RenderRouteWithOutletContext>
      );

      const headingEl = screen
        .findByText('Booking Confirmed')
        .then(data => data)
        .catch(e => null); // Return null when not found
      expect(await headingEl).toBe(null);
    });
  });
});
