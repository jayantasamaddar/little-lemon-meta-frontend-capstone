import { useEffect } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import { Heading, Logo, Main, Table } from '../../../../components';
import { useForm } from '../../../../context';
import './ConfirmedBooking.css';

export const ConfirmedBooking = () => {
  const { state } = useForm();
  const { data } = useOutletContext();

  const { stage } = state;

  const columns = Object.entries(data).map(([key, val], i) => ({
    id: i + 1,
    name: key,
    label: key.toUpperCase(),
  }));

  console.log({ columns });

  /** Store in DB (Local Storage according to course) */
  useEffect(() => {
    if (stage === 'Thank You') {
      try {
        localStorage.setItem(data.booking_id, JSON.stringify(data));
        const response = localStorage.getItem(data.booking_id);
        if (response) {
          console.log('Successfully added to Local Storage');
        } else throw new Error('Could not add to Local Storage');
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [data, stage]);

  return stage === 'Thank You' ? (
    <Main>
      <section className="LL-BookingConfirmation">
        <Logo
          src="https://ik.imagekit.io/zenius/Coursera/html-css/Asset_16_4x_nnQ67G1HkI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674426270946"
          height="100px"
          width="fit-content"
        />
        <Heading tag="h1" size="xl">
          Booking Confirmed
        </Heading>
        <p>
          We are pleased to inform you that your reservation request has been
          received and confirmed.
        </p>
      </section>

      <section id="LL-BookingDetails">
        <Heading size="lg">Booking Details</Heading>
        <Table rows={[data]} columns={columns} />
      </section>
    </Main>
  ) : (
    <Navigate to="/bookings" />
  );
};
