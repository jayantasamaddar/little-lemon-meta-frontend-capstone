import { useCallback, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Main, Heading, ProgressBar, Button, Icon } from '../../components';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './BookingPage.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { BookingForm } from './components';
import { FormContextProvider } from '../../context';
import {
  currentDateTime,
  fetchAPI,
  submitAPI,
  generateBookingID,
} from '../../utilities';

import { bookingFormReducer, STAGES, loadInitialState } from '../../actions';

// const STAGES = ['Reservation Details', 'Thank You'];

export const BookingPage = () => {
  const location = useLocation();

  // const loadInitialState = () => ({
  //   availableTimes: fetchAPI(new Date()), // initializeTimes as per Instructions
  //   formData: {
  //     firstName: '',
  //     lastName: '',
  //     bookingDate: currentDateTime(1).date,
  //     bookingTime: '17:00',
  //     guests: '1',
  //     occasion: '',
  //   },
  //   formErrors: {
  //     firstName: '',
  //     lastName: '',
  //     bookingDate: '',
  //     bookingTime: '',
  //     guests: '1',
  //     occasion: '',
  //   },
  //   isDirty: {
  //     firstName: false,
  //     lastName: false,
  //     bookingDate: false,
  //     bookingTime: false,
  //     guests: false,
  //     occasion: false,
  //   },
  //   stage: STAGES[0],
  //   booking_id: generateBookingID(),
  // });

  // const updateTimes = (state, payload) => ({
  //   ...state,
  //   availableTimes: fetchAPI(payload),
  // });

  // const reducer = (state, { type, payload }) => {
  //   switch (type) {
  //     case 'setAvailableTimes':
  //       return updateTimes(state, payload);
  //     case 'setFormData':
  //       return {
  //         ...state,
  //         formData: { ...state.formData, ...payload },
  //       };
  //     case 'setIsDirty':
  //       return {
  //         ...state,
  //         isDirty: { ...state.isDirty, ...payload },
  //       };
  //     case 'setFormErrors':
  //       return {
  //         ...state,
  //         formErrors: { ...state.formErrors, ...payload },
  //       };
  //     case 'setStage':
  //       return { ...state, stage: payload };
  //     case 'reset': {
  //       return { ...loadInitialState() };
  //     }
  //     default:
  //       break;
  //   }
  // };

  const [state, dispatch] = useReducer(bookingFormReducer, loadInitialState());

  useEffect(() => {
    if (location?.state?.from === 'navigation') dispatch({ type: 'reset' });
  }, [location?.state?.from]);

  // console.log({ stateInBookingPage: state });

  const navigate = useNavigate();

  /*****************************************************************/
  /** Event Handling */
  /*****************************************************************/
  const goNextStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(state.stage) ?? STAGES.length;
    if (stageIndex < STAGES.length - 1) {
      dispatch({ type: 'setStage', payload: STAGES[stageIndex + 1] });
    }
    return;
  }, [state.stage]);

  const goPreviousStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(state.stage) ?? 0;
    if (stageIndex > 0) {
      dispatch({ type: 'setStage', payload: STAGES[stageIndex - 1] });
    } else {
      navigate('/');
    }
    return;
  }, [state.stage, navigate]);

  const submitForm = e => {
    e.preventDefault();
    try {
      if (Object.values(state.formErrors).find(val => val.length > 0)) {
        throw new Error('Form could not be submitted - contains errors!');
      }

      // Submit Form
      const response = submitAPI({
        booking_id: state.booking_id,
        ...state.formData,
      });
      if (response) {
        goNextStage();
        navigate('thank-you');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Main>
      <ProgressBar
        value={((STAGES.indexOf(state.stage) + 1) / STAGES.length) * 100}
      />

      <nav className="LL-BookingPageNavigation">
        {STAGES[STAGES.length - 1] !== state.stage && (
          <Button unstyled onClick={goPreviousStage}>
            <Icon src={faArrowLeft} size="2x" />
          </Button>
        )}
        <Heading tag="h1" size="xl" align="center">
          {state.stage}
        </Heading>
        {STAGES[STAGES.length - 1] !== state.stage && (
          <Button unstyled onClick={() => {}}>
            <Icon src={faTimes} size="2x" />
          </Button>
        )}
      </nav>

      <FormContextProvider value={{ state, dispatch }}>
        {STAGES.indexOf(state.stage) === 0 && (
          <section className="LL-BookingPageContainer">
            {/** Enter Content for Larger Screens */}
            <section id="LL-BookingPageHero">
              <img
                src="https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-restaurant_wsHVlbvkh.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675153797856&tr=w-1080%2Ch-1350%2Cfo-auto"
                alt="Little Lemon - Seating"
              />
            </section>
            <BookingForm onSubmit={submitForm} />
          </section>
        )}
        <Outlet
          context={{
            data: { booking_id: state.booking_id, ...state.formData },
            stage: state.stage,
          }}
        />
      </FormContextProvider>
    </Main>
  );
};
