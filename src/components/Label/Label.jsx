import './Label.css';

export const Label = ({
  className,
  htmlFor,
  id,
  required,
  children,
  ...restProps
}) => {
  return (
    <label
      id={id}
      className={`LL-Label ${className ?? ''}`}
      htmlFor={htmlFor}
      {...{ 'data-required': required ? true : undefined }}
      {...restProps}
    >
      {children}
    </label>
  );
};
