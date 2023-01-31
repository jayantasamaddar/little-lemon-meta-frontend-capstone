import './Error.css';

export const Error = ({ id, className, children }) => {
  const test_id =
    process.env.REACT_APP_STAGE === 'DEVELOPMENT'
      ? { 'data-testid': 'll-error' }
      : {};

  return (
    <p id={id} className={`LL-Error text-sm ${className ?? ''}`} {...test_id}>
      {children}
    </p>
  );
};
