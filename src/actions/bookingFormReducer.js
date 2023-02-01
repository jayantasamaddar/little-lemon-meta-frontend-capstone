import { currentDateTime, fetchAPI, generateBookingID } from '../utilities';

export const STAGES = ['Reservation Details', 'Thank You'];

export const loadInitialState = () => ({
  availableTimes: fetchAPI(new Date()), // initializeTimes as per Instructions
  formData: {
    firstName: '',
    lastName: '',
    bookingDate: currentDateTime(1).date,
    bookingTime: '17:00',
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
  stage: STAGES[0],
  booking_id: generateBookingID(),
});

const updateTimes = (state, payload) => ({
  ...state,
  availableTimes: fetchAPI(payload),
});

export const bookingFormReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setAvailableTimes':
      return updateTimes(state, payload);
    case 'setFormData':
      return {
        ...state,
        formData: { ...state.formData, ...payload },
      };
    case 'setIsDirty':
      return {
        ...state,
        isDirty: { ...state.isDirty, ...payload },
      };
    case 'setFormErrors':
      return {
        ...state,
        formErrors: { ...state.formErrors, ...payload },
      };
    case 'setStage':
      return { ...state, stage: payload };
    case 'reset': {
      return { ...loadInitialState() };
    }
    default:
      break;
  }
};
