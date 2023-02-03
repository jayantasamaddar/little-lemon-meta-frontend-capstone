import { fireEvent, render, screen } from '@testing-library/react';

import { Select } from './Select';

describe('components/Select', () => {
  describe('<Select />', () => {
    const selectOpts = [
      {
        id: 1,
        label: 'Birthday',
        value: 'birthday',
      },
      {
        id: 2,
        label: 'Anniversary',
        value: 'anniversary',
      },
      {
        id: 3,
        label: 'Engagement',
        value: 'engagement',
      },
    ];

    it('Rendered in the DOM', () => {
      render(<Select label="Occasions" options={selectOpts} />);
      const selectEl = screen.getByLabelText('Occasions');
      expect(selectEl).toBeInTheDocument();
      Array.from(selectEl.childNodes).forEach((option, i) => {
        expect(option.tagName).toBe('OPTION');
        expect(option).toHaveValue(selectOpts[i].value);
      });
    });

    it('Focussed and Selected when Change Event', () => {
      const i = 1;
      render(<Select label="Occasions" options={selectOpts} />);
      const selectEl = screen.getByLabelText('Occasions');

      const targetValue = selectOpts[i].value;
      fireEvent.change(selectEl, { target: { value: targetValue } });
      expect(selectEl).toHaveValue(targetValue);
    });

    it('With Placeholder and Dirty Placeholder', () => {
      const i = 1;
      const placeholder = 'Choose an Occasion';
      const dirtyPlaceholder = 'No Special Occasion';
      render(
        <Select
          label="Occasions"
          options={selectOpts}
          placeholder={placeholder}
          dirtyPlaceholder={dirtyPlaceholder}
        />
      );
      const selectEl = screen.getByLabelText('Occasions');
      const options = screen.getAllByRole('option');
      const targetValue = selectOpts[i].value;

      expect(options[0]).toHaveTextContent(placeholder);
      expect(options.length).toStrictEqual(selectOpts.length + 1);

      fireEvent.change(selectEl, { target: { value: targetValue } });

      expect(options[0]).toHaveTextContent(dirtyPlaceholder); // Changed to the Dirty Placeholder
    });
  });
});
