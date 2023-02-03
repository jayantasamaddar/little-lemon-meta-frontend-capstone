import './Option.css';

export const Option = ({ id, value, disabled, selected, children }) => {
  const coreProps = {
    id,
    className: 'LL-SelectOption',
    value,
    disabled,
    'aria-selected': selected,
  };
  return <option {...coreProps}>{children}</option>;
};
