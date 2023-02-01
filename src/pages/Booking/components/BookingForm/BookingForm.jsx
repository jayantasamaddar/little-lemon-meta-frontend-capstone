import { useCallback } from 'react';
import { Textfield, Button, Select } from '../../../../components';
import './BookingForm.css';
import {
  compareDates,
  withinReservationHours,
  roundTime,
  normalizeAvailability,
} from '../../../../utilities';
import { useForm } from '../../../../context';

const OCCASIONS_LIST = [
  {
    id: 1,
    label: 'Birthday',
    value: 'birthday',
  },
  {
    id: 2,
    label: 'Anniversary',
    value: 'anniversary',
  },
  {
    id: 3,
    label: 'Engagement',
    value: 'engagement',
  },
];

export const BookingForm = ({ onSubmit }) => {
  const {
    state: { availableTimes, formData, formErrors, isDirty },
    dispatch,
  } = useForm() ?? {
    state: { availableTimes: [], formdata: {}, formErrors: {}, isDirty: {} },
  };

  console.log({
    stateInForm: { availableTimes, formData, formErrors, isDirty },
  });

  const test_id =
    process.env.REACT_APP_STAGE === 'DEVELOPMENT'
      ? { 'data-testid': 'reservation-form' }
      : {};

  const handleCheck = () => {
    console.log('');
  };

  /**********************************************************************************/
  /** With Form Context */
  /**********************************************************************************/

  const onFocus = ({ target }) => {
    dispatch({
      type: 'setIsDirty',
      payload: { [target.name || target.id]: true },
    });
  };

  const onBlur = ({ target }) => {
    // Required validation when field is dirty
    const { name, type, value, required } = target;
    if (isDirty && value === '' && required) {
      dispatch({
        type: 'setFormErrors',
        payload: { [name]: `${name} is a required field!` },
      });

      if (type === 'time') {
        dispatch({
          type: 'setFormData',
          payload: { [name]: roundTime(value, 15) },
        });
      }
    }
  };

  const handleChange = useCallback(
    ({ target }) => {
      const { id, name, type, value, required, min, max } = target;

      // Set values
      dispatch({ type: 'setFormData', payload: { [name || id]: value } });

      // Required validation for all fields
      if (required && value === '') {
        // Show Error for all fields
        dispatch({
          type: 'setFormErrors',
          payload: { [name || id]: `${name || id} is a required field!` },
        });
      } else {
        // Reset errors for all fields
        dispatch({ type: 'setFormErrors', payload: { [name || id]: '' } });
      }

      // Date Validation
      if (id === 'bookingDate') {
        if (!compareDates(Date.now(), value, 1)) {
          dispatch({
            type: 'setFormErrors',
            payload: { [name]: 'You need to book at least a day in advance' },
          });
        }
        dispatch({ type: 'setAvailableTimes', payload: new Date(value) });
      }

      // Time Validatiom
      if (type === 'time') {
        // Whether selected time is within scheduled hours
        if (!withinReservationHours(min, max, value)) {
          dispatch({
            type: 'setFormErrors',
            payload: {
              [name]: `Reservation hours are between ${min} and ${max}!`,
            },
          });

          // Reset value
          dispatch({ type: 'setFormData', payload: { [name]: min } });
          // Reset error after 5 seconds
          const timeoutError = setTimeout(
            () => dispatch({ type: 'setFormData', payload: { [name]: '' } }),
            5000
          );
          timeoutError();
          clearTimeout(timeoutError);
        }
      }
    },
    [dispatch]
  );

  /**********************************************************************************/
  /** Render Form JSX */
  /**********************************************************************************/

  return (
    <form
      id="LL-BookingForm"
      onSubmit={onSubmit}
      {...test_id}
      aria-label="Little Lemon - Booking Form"
    >
      <Textfield
        label="First Name"
        id="firstName"
        name="firstName"
        type="text"
        required
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.firstName ?? ''}
        errors={formErrors.firstName}
      />

      <Textfield
        label="Last Name"
        id="lastName"
        name="lastName"
        type="text"
        required
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.lastName ?? ''}
        errors={formErrors.lastName}
      />

      <Textfield
        label="Booking Date"
        id="bookingDate"
        name="bookingDate"
        type="date"
        required
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.bookingDate ?? ''}
        errors={formErrors.bookingDate}
      />

      <Select
        label="Booking Time"
        id="bookingTime"
        name="bookingTime"
        required
        options={normalizeAvailability(availableTimes)}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.bookingTime ?? ''}
        errors={formErrors.bookingTime}
      />

      <Textfield
        label="Number of Guests"
        id="guests"
        name="guests"
        type="number"
        required
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.guests ?? '1'}
        errors={formErrors.guests}
        min="1"
        max="10"
      />

      <Select
        label="Occasion"
        id="occasion"
        name="occasion"
        placeholder="Choose an Occasion"
        dirtyPlaceholder="No Special Occasion"
        options={OCCASIONS_LIST}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={formData?.occasion ?? ''}
        errors={formErrors.occasion}
      />

      <Button
        id="btn-reservation"
        type="submit"
        onClick={handleCheck}
        disabled={Object.values(formErrors).find(val => val.length > 0)}
      >
        View Availability
      </Button>
    </form>
  );
};
