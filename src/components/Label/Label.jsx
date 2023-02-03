import './Label.css';

export const Label = ({
  className,
  htmlFor,
  id,
  required,
  children,
  hidden,
  ...restProps
}) => {
  const accessibilityProps = {
    'aria-hidden': hidden,
  };
  const dataProps = {
    'data-required': required ? true : undefined,
    'data-hidden': hidden,
  };
  return (
    <label
      id={id}
      className={`LL-Label ${className ?? ''}`}
      htmlFor={htmlFor}
      {...dataProps}
      {...restProps}
      {...accessibilityProps}
    >
      {children}
    </label>
  );
};
