import { Card, Heading } from '../../../../components';
import './Testimonials.css';

export const Testimonials = ({ data }) => {
  return (
    <section id="testimonials">
      <Heading align="center">Testimonials</Heading>
      <section className="testimonial-carousel">
        {data.map(({ id, rating, review, image }) => (
          <Card key={id} title="Testimonials" imagePosition="left">
            {/** id, rating, review, image */}
            <div className="">Name</div>
            <div className="">Rating</div>
            <div className="">Review</div>
          </Card>
        ))}
      </section>
    </section>
  );
};
