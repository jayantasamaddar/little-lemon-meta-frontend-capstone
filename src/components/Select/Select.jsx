import { useState, useId, forwardRef } from 'react';
import { Option } from './components';
import { Label, Error } from '../../components';
import './Select.css';

export const Select = forwardRef(
  (
    {
      id,
      name,
      className,
      label,
      required = false,
      value,
      options,
      placeholder,
      dirtyPlaceholder,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaErrorMessage,
      errors,
      multiple,
      disabled,
      onFocus,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const [isDirty, setIsDirty] = useState(false);
    const _id = useId();
    const select_id = id ?? `${name}-${_id}`;
    const label_id = ariaLabelledBy
      ? ariaLabelledBy
      : select_id
      ? `${select_id}-label`
      : undefined;
    const error_id = errors ? `${select_id}-error` : null;

    const handleChange = e => {
      e.target.focus();
      setIsDirty(true);
      onChange && onChange(e);
    };

    const elementProps = {
      id: select_id,
      ref,
      name,
      className: `LL-Select ${className ?? ''}`,
      value,
      multiple,
      required,
      disabled,
      onChange: handleChange,
      onBlur,
      onFocus,
    };

    const accessibilityProps = {
      'aria-labelledby': label_id,
      'aria-describedby': ariaDescribedBy
        ? ariaDescribedBy
        : error_id
        ? error_id
        : undefined,
      'aria-errormessage': ariaErrorMessage
        ? ariaErrorMessage
        : error_id
        ? error_id
        : undefined,
    };

    return (
      <section className={`LL-SelectContainer ${className ?? ''}`}>
        <Label
          id={label_id}
          className={`LL-SelectLabel ${error_id ? 'error' : ''}`}
          htmlFor={select_id}
          required={required}
        >
          {label}
        </Label>

        <div className="LL-SelectFieldWrapper">
          <select {...elementProps} {...accessibilityProps}>
            {placeholder && (
              <Option value="">
                -- {!isDirty ? placeholder : dirtyPlaceholder ?? 'Select None'}{' '}
                --
              </Option>
            )}
            {options?.map(({ id, label, value: v }, i) => (
              <Option
                id={id}
                key={id ?? v ?? i}
                value={v}
                selected={v === value ? true : undefined}
              >
                {label}
              </Option>
            ))}
          </select>
        </div>

        {/** Error Handling */}
        {error_id && (
          <section className="LL-SelectErrors">
            <Error id={error_id}>{errors}</Error>
          </section>
        )}
      </section>
    );
  }
);
