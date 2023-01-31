import { useCallback, useState, useReducer } from 'react';
import { Main, Heading, ProgressBar, Button } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './BookingPage.css';
import { useNavigate } from 'react-router-dom';
import { BookingForm } from './components';
import { FormContextProvider } from '../../context';

const STAGES = ['Reservation Details', 'Confirm Reservation'];

export const BookingPage = () => {
  const [stage, setStage] = useState('Reservation Details');

  const initializeTimes = () => {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  };

  const updateTimes = (state, action) => {
    return state;
  };

  const [state, dispatch] = useReducer(updateTimes, initializeTimes());

  const navigate = useNavigate();

  /*****************************************************************/
  /** Event Handling */
  /*****************************************************************/
  const goNextStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(stage) ?? STAGES.length;
    if (stageIndex < STAGES.length - 1) {
      setStage(STAGES[stageIndex + 1]);
    }
    return;
  }, [stage]);

  const goPreviousStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(stage) ?? 0;
    if (stageIndex > 0) {
      setStage(STAGES[stageIndex - 1]);
    } else {
      navigate('/');
    }
    return;
  }, [stage, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('');
  };

  return (
    <Main>
      <ProgressBar value={100 / STAGES.length / (STAGES.indexOf(stage) + 1)} />

      <nav className="LL-ReservationFormNavigation">
        <Button unstyled onClick={goPreviousStage}>
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </Button>
        <Heading tag="h1" size="xl" align="center">
          {stage}
        </Heading>
        <Button unstyled onClick={() => {}}>
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </Button>
      </nav>

      <FormContextProvider value={{ availableTimes: state, dispatch }}>
        <section className="LL-ReservationFormContainer">
          <BookingForm onSubmit={handleSubmit} />
        </section>
      </FormContextProvider>
    </Main>
  );
};
