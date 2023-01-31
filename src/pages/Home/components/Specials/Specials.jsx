import { Button, Card, Heading } from '../../../../components';
// import { FoodCard } from '../FoodCard/FoodCard';
import './Specials.css';

export const Specials = ({ data, itemWidth }) => {
  return (
    <section id="specials" className="specials">
      <section className="specials-titlebar">
        <Heading size="lg">Specials</Heading>
        <Button>Online Menu</Button>
      </section>

      <section className="specials-items">
        {data.map(({ id, title, price, description, image }) => (
          <Card key={id} title={title} width={itemWidth} image={image}>
            <div className="card-header card-variant-food">
              <Heading tag="h3" size="m" className="food-title">
                {title}
              </Heading>
              <p className="food-price">${price}</p>
            </div>
            <div className="food-desc">{description}</div>

            <div className="card-footer card-variant-food">
              <Button>Order</Button>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
};
