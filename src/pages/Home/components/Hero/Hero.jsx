import { Button, Heading } from '../../../../components';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <Heading tag="h1">Little Lemon</Heading>
        <p>Chicago</p>
        <p id="hero-desc">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Button id="hero-btn" primary>
          Reserve a Table
        </Button>
      </div>
      <div className="hero-right">
        <img
          src="https://ik.imagekit.io/zenius/Coursera/html-css/little-lemon-pizzas_v269Oq2LM.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674426273890"
          alt="Little Lemon - Hero"
        />
      </div>
    </section>
  );
};
