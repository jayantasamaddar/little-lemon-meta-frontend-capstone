import {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useId,
} from 'react';
import { Label, Error } from '../../components';
import './Textfield.css';

const VALID_INPUT_TYPES = [
  'text',
  'number',
  'email',
  'password',
  'tel',
  'url',
  'date',
  'time',
];

export const Textfield = forwardRef(
  (
    {
      className,
      id,
      type = 'text',
      name,
      label,
      placeholder,
      required = false,
      value,
      min,
      max,
      minLength,
      maxLength,
      pattern,
      disabled,
      onFocus,
      onBlur,
      onChange,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaErrorMessage,
      multiline,
      labelHidden,
      selectOnFocus,
      errors,
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    const inputRef = useRef(null);
    const textAreaRef = useRef(null);

    const Input = multiline ? 'textarea' : 'input';
    const _id = useId();
    const input_id = id ?? `${name ? '-' : ''}${_id}`;
    const label_id = ariaLabelledBy
      ? ariaLabelledBy
      : input_id
      ? `${input_id}-label`
      : undefined;
    const error_id = errors ? `${input_id}-error` : null;

    useImperativeHandle(
      ref,
      () => Input === (multiline ? textAreaRef : inputRef).current
    );

    useEffect(() => {
      const target = (multiline ? textAreaRef : inputRef).current;
      target.value !== '' ? setIsEmpty(false) : setIsEmpty(true);
      focus ? target?.focus() : target?.blur();
    }, [focus, multiline]);

    /********************************************************************************/
    /** Event Handlers */
    /********************************************************************************/
    const handleFocus = useCallback(
      e => {
        setIsDirty(true);
        setFocus(true);
        if (selectOnFocus) {
          const target = multiline ? textAreaRef.current : inputRef.current;
          target?.select();
        }
        onFocus && onFocus(e);
      },
      [selectOnFocus, onFocus, multiline]
    );

    const handleBlur = useCallback(
      e => {
        setFocus(false);
        onBlur && onBlur(e);
      },
      [onBlur]
    );

    /*************************************************************************/
    /** Serialize Props */
    /*************************************************************************/

    const accessibilityProps = {
      'aria-labelledby': label_id,
      'aria-describedby': ariaDescribedBy
        ? ariaDescribedBy
        : error_id
        ? error_id
        : undefined,
      'aria-invalid': errors?.length > 0,
      'aria-errormessage': ariaErrorMessage
        ? ariaErrorMessage
        : error_id
        ? error_id
        : undefined,
      'aria-disabled': disabled,
      'aria-multiline': multiline,
    };

    const additionalClasses = isDirty && error_id ? 'error' : '';

    const elementProps = {
      className: `LL-Textfield ${additionalClasses}`,
      id: input_id,
      type: VALID_INPUT_TYPES.includes(type) ? type : 'text',
      ref: multiline ? textAreaRef : inputRef,
      name,
      required,
      min,
      max,
      minLength,
      maxLength,
      placeholder,
      disabled,
      value,
      pattern,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange,
    };

    const dataProps = {
      'data-focus': focus,
      'data-input': !isEmpty || ['date', 'time'].includes(elementProps.type),
    };

    return (
      <div className={`LL-TextfieldContainer ${className ?? ''}`}>
        {!labelHidden && label && (
          <Label
            className={`LL-TextfieldLabel ${additionalClasses}`}
            id={label_id}
            htmlFor={input_id}
            required={required}
            {...dataProps}
          >
            {label}
          </Label>
        )}
        <Input {...elementProps} {...accessibilityProps} {...dataProps} />

        {/** Error Handling */}
        {isDirty && error_id && (
          <section className="LL-TextfieldErrors">
            <Error id={error_id}>{errors}</Error>
          </section>
        )}
      </div>
    );
  }
);
