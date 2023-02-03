import { useNavigate } from 'react-router-dom';
import { Button, Heading } from '../../../../components';
import './Hero.css';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="LL-Hero">
      <div className="LL-Hero-left">
        <Heading tag="h1" size="2xl">
          Little Lemon
        </Heading>
        <p className="subtitle">Chicago</p>
        <p id="LL-Hero-desc">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Button
          ariaLabel="Reserve a Table"
          id="LL-Hero-btn"
          primary
          onClick={() => navigate('/bookings')}
        >
          Reserve a Table
        </Button>
      </div>
      <div className="LL-Hero-right">
        <img
          src="https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-pizzas_v269Oq2LM.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674426273890"
          alt="Little Lemon - Hero"
        />
      </div>
    </section>
  );
};
