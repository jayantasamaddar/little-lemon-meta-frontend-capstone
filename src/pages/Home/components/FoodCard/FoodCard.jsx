import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';

export const FoodCard = ({
  title,
  image,
  price,
  cta: { label, url },
  children,
}) => {
  return (
    <Card title={title} image={image}>
      <div className="card-header card-variant-food">
        <h4>{title}</h4>
        <p>{price}</p>
      </div>
      <div className="card-body card-variant-food">{children}</div>

      <div className="card-footer card-variant-food">
        <Button>{label}</Button>
      </div>
    </Card>
  );
};
