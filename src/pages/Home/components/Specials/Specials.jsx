import { Button, Card, Heading } from '../../../../components';
// import { FoodCard } from '../FoodCard/FoodCard';
import './Specials.css';

export const Specials = ({ data, itemWidth }) => {
  return (
    <section id="specials" className="specials">
      <section className="specials-titlebar">
        <Heading>Specials</Heading>
        <Button primary>Online Menu</Button>
      </section>

      <section className="specials-items">
        {data.map(({ id, title, price, description, image }) => (
          <Card key={id} title={title} width={itemWidth} image={image}>
            <div className="card-header card-variant-food">
              <h4>{title}</h4>
              <p>${price}</p>
            </div>
            <div className="card-variant-food">{description}</div>

            <div className="card-footer card-variant-food">
              <Button primary>Order</Button>
            </div>
          </Card>
        ))}
      </section>
    </section>
  );
};
