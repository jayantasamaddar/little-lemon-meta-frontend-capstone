import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Textfield } from './Textfield';
import userEvent from '@testing-library/user-event';

describe('components/Textfield', () => {
  describe('<Textfield />', () => {
    const inputVal = 'Modified';

    it('Rendered in the DOM', () => {
      render(<Textfield label="Test Textbox" />);
      const textfieldEl = screen.getByLabelText('Test Textbox');
      expect(textfieldEl).toBeInTheDocument();
    });

    it('Events are working', () => {
      const mockChange = jest.fn();
      const mockFocus = jest.fn();
      const mockBlur = jest.fn();
      render(
        <Textfield
          label="Test Textbox"
          onChange={mockChange}
          onFocus={mockFocus}
        />
      );
      const textfieldEl = screen.getByLabelText('Test Textbox');

      userEvent.type(textfieldEl, 'Modified');
      expect(textfieldEl).toHaveFocus();
      expect(mockFocus).toHaveBeenCalled();
      expect(mockChange).toHaveBeenCalled();
      expect(textfieldEl).toHaveValue('Modified');
      expect(mockBlur).not.toHaveBeenCalled();
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => fireEvent.blur(textfieldEl));

      expect(textfieldEl).not.toHaveFocus(); // Confirm that blur happened
    });

    it('Select on Focus', () => {
      render(<Textfield label="Test Textbox" selectOnFocus />);
      const textfieldEl = screen.getByLabelText('Test Textbox');
      /** Get selection before focus event */
      const beforeFocusSelection = inputVal?.slice(
        textfieldEl.selectionStart ?? 0,
        textfieldEl.selectionEnd ?? 0
      );

      userEvent.type(textfieldEl, inputVal);

      expect(beforeFocusSelection).not.toBe(inputVal); // Compare to input value: Not selected

      fireEvent.focus(textfieldEl);

      /** Get selection after focus event */
      const afterFocusSelection = inputVal?.slice(
        textfieldEl.selectionStart ?? 0,
        textfieldEl.selectionEnd ?? 0
      );
      expect(afterFocusSelection).toBe(inputVal); // Compare to input value: Selected
    });

    it('Multiline Textarea', () => {
      render(<Textfield multiline label="Textarea" />);
      const textfieldEl = screen.getByLabelText('Textarea');
      expect(textfieldEl.tagName).toEqual('TEXTAREA');
    });
  });
});
