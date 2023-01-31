import { Card, Heading, ReviewStar } from '../../../../components';
import './Testimonials.css';

export const Testimonials = ({ data }) => {
  return (
    <section id="testimonials">
      <Heading size="xl" align="center">
        Testimonials
      </Heading>
      <section className="LL-Testimonials-Carousel">
        {data.map(({ id, rating, name, review, image }) => (
          <Card
            key={id}
            title="Testimonials"
            imagePosition="left"
            image={image}
          >
            <Heading tag="h3" size="base" className="LL-Testimonial-Name">
              {name}
            </Heading>
            <div className="LL-Testimonial-Rating flex">
              {Array.from(
                { length: Math.round(Math.abs(Number(rating))) },
                () => (
                  <ReviewStar />
                )
              )}
            </div>
            <div className="LL-Testimonial-Review">{review}</div>
          </Card>
        ))}
      </section>
    </section>
  );
};
