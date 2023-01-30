import './Button.css';

export const Button = ({
  className,
  primary,
  outline,
  alert,
  disabled,
  children,
  onClick,
}) => {
  const basicProps = {
    className: 'btn' + (className ? ` ${className}` : ''),
    onClick,
  };

  basicProps.className += primary ? ' primary' : '';
  basicProps.className += outline ? ' outline' : '';
  basicProps.className += alert ? ' alert' : '';
  basicProps.className += disabled ? ' disabled' : '';

  return <button {...basicProps}>{children}</button>;
};
