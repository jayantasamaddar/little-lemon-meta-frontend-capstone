import './Button.css';

export const Button = ({
  id,
  className,
  primary,
  outline,
  alert,
  disabled,
  children,
  onClick,
  unstyled,
  type = 'button',
}) => {
  const basicProps = {
    id,
    className: unstyled
      ? 'btn-unstyled'
      : 'btn' + (className ? ` ${className}` : ''),
    onClick,
    type,
    role: 'button',
  };

  basicProps.className += primary ? ' primary' : '';
  basicProps.className += outline ? ' outline' : '';
  basicProps.className += alert ? ' alert' : '';
  basicProps.className += disabled ? ' disabled' : '';

  return <button {...basicProps}>{children}</button>;
};
