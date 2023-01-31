import './Label.css';

export const Label = ({ className, htmlFor, id, children, ...restProps }) => {
  return (
    <label
      id={id}
      className={`LL-Label ${className ?? ''}`}
      htmlFor={htmlFor}
      {...restProps}
    >
      {children}
    </label>
  );
};
