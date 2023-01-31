import { useState } from 'react';
import { Textfield, Button, Select } from '../../../../components';
import './BookingForm.css';
import {
  compareDates,
  currentDateTime,
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
  const { availableTimes, dispatch } = useForm() ?? {
    availableTimes: [],
    dispatch: () => {},
  };

  const test_id =
    process.env.REACT_APP_STAGE === 'DEVELOPMENT'
      ? { 'data-testid': 'reservation-form' }
      : {};

  // Update Form to dispatch when date form field is changed

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    bookingDate: currentDateTime(1).date,
    bookingTime: '17:00',
    guests: 1,
    occasion: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    bookingDate: '',
    bookingTime: '',
    guests: '',
    occasion: '',
  });

  const [isDirty, setIsDirty] = useState({
    firstName: false,
    lastName: false,
    bookingDate: false,
    bookingTime: false,
    guests: false,
    occasion: false,
  });

  console.log({ values, isDirty, errors, availableTimes });

  const onFocus = ({ target }) => {
    setIsDirty(prev => ({ ...prev, [target.name]: true }));
  };

  const onBlur = ({ target }) => {
    // Required validation when field is dirty
    const { name, type, value, required } = target;
    if (isDirty && value === '' && required) {
      setErrors(prev => ({
        ...prev,
        [name]: `${name} is a required field!`,
      }));
    }
    if (type === 'time') {
      setValues(prev => ({
        ...prev,
        [name]: roundTime(value, 15),
      }));
    }
  };

  const handleChange = ({ target }) => {
    const { id, name, type, value, required, min, max } = target;

    // Set values
    setValues(prev => ({
      ...prev,
      [name || id]: value,
    }));

    // Required validation for all fields
    if (required && value !== '') {
      // Reset errors for all fields
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    } else {
      // Show Error for all fields
      setErrors(prev => ({ ...prev, [name]: `${name} is a required field!` }));
    }

    // Date Validation
    if (type === 'date') {
      if (!compareDates(Date.now(), value, 1)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'You need to book at least a day in advance',
        }));
      }
      dispatch({ type: 'bookingDate', payload: new Date(value) });
    }

    // Time Validatiom
    if (type === 'time') {
      // Whether selected time is within scheduled hours
      if (!withinReservationHours(min, max, value)) {
        setErrors(prev => ({
          ...prev,
          [name]: `Reservation hours are between ${min} and ${max}!`,
        }));
        // Reset value
        setValues(prev => ({ ...prev, [name]: min }));
        // Reset error after 5 seconds
        const timeoutError = setTimeout(
          () => setErrors(prev => ({ ...prev, [name]: '' })),
          5000
        );
        timeoutError();
        clearTimeout(timeoutError);
      }
    }
  };

  const handleCheck = () => {
    console.log('');
  };

  /**********************************************************************************/
  /** Render Form JSX */
  /**********************************************************************************/

  return (
    <form onSubmit={onSubmit} {...test_id}>
      <Textfield
        label="First Name"
        id="firstName"
        name="firstName"
        type="text"
        required
        onBlur={onBlur}
        onChange={handleChange}
        value={values.firstName}
        errors={errors.firstName}
      />

      <Textfield
        label="Last Name"
        id="lastName"
        name="lastName"
        type="text"
        required
        onBlur={onBlur}
        onChange={handleChange}
        value={values.lastName}
        errors={errors.lastName}
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
        value={values.bookingDate}
        errors={errors.bookingDate}
      />

      {availableTimes && (
        <Select
          label="Booking Time"
          id="bookingTime"
          name="bookingTime"
          required
          placeholder="Choose a Booking Time Slot"
          options={normalizeAvailability(availableTimes)}
          onChange={handleChange}
          value={values.bookingTime}
          errors={errors.bookingTime}
        />
      )}

      <Textfield
        label="Number of Guests"
        id="guests"
        name="guests"
        type="number"
        required
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange}
        value={values.guests}
        errors={errors.guests}
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
        onChange={handleChange}
        value={values.occasion}
        errors={errors.occasion}
      />

      <Button id="btn-reservation" type="submit" onClick={handleCheck}>
        View Availability
      </Button>
    </form>
  );
};
