import { forwardRef } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon';
import './Button.css';

export const Button = forwardRef(
  (
    {
      id,
      className,
      type = 'button',
      primary,
      outline,
      alert,
      role,
      disabled,
      children,
      onClick,
      onFocus,
      onBlur,
      onKeyUp,
      unstyled,
      loading,
      ariaLabel,
      ariaControls,
      ariaChecked,
      ariaExpanded,
      ariaDescribedBy,
      ariaPressed,
    },
    ref
  ) => {
    const coreProps = {
      id,
      className: unstyled
        ? 'btn-unstyled'
        : 'btn' + (className ? ` ${className}` : ''),
      type,
      role: role ? role + ' button' : 'button',
      disabled,
      ref,
    };

    coreProps.className += primary ? ' btn-primary' : '';
    coreProps.className += outline ? ' btn-outline' : '';
    coreProps.className += alert ? ' btn-alert' : '';
    coreProps.className += disabled ? ' btn-disabled' : '';

    const interactiveProps = {
      onFocus,
      onBlur,
      onClick,
      onKeyUp,
    };

    const loadingMarkup = loading ? <Icon src={faSpinner} size="2x" /> : null;

    const accessibilityProps = {
      'aria-disabled': disabled ? true : undefined,
      'aria-busy': loading ? true : undefined,
      'aria-label': ariaLabel,
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-pressed': ariaPressed,
      'aria-checked': ariaChecked,
      'aria-expanded': ariaExpanded,
    };

    return (
      <button {...coreProps} {...interactiveProps} {...accessibilityProps}>
        {loadingMarkup}
        <span className="LL-ButtonText">{children}</span>
      </button>
    );
  }
);
