import './Card.css';

const IMAGE_PLACEMENT = ['top-full', 'left', 'right', 'bottom-full'];

export const Card = ({
  title,
  image,
  children,
  imagePosition = 'top-full',
  width,
  height,
}) => {
  const position = IMAGE_PLACEMENT.includes(imagePosition) ? imagePosition : '';
  const classes = `card ${position}`;

  return (
    <article className={classes} style={{ width: width ?? 'auto' }}>
      <section className={`card-image ${position}`}>
        <img
          src={image || 'https://via.placeholder.com/300x200?text=Card+Image'}
          alt={title}
          title={title}
        />
      </section>
      <div className="card-body">{children}</div>
    </article>
  );
};
