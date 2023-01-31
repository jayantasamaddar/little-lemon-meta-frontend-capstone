import './Option.css';

export const Option = ({ value, disabled, children }) => {
  return (
    <option className="LL-SelectOption" value={value} disabled={disabled}>
      {children}
    </option>
  );
};
