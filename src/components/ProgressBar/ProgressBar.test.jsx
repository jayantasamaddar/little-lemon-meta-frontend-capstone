import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('components/ProgressBar', () => {
  describe('<ProgressBar />', () => {
    it('Rendered in the DOM', () => {
      const value = 50;
      render(<ProgressBar value={value} />);
      const progressBarEl = screen.getByRole('progressbar');
      const progressBarIndicatorEl = screen.getByLabelText(value);
      expect(progressBarEl).toBeInTheDocument();
      expect(progressBarIndicatorEl).toBeInTheDocument();
    });

    it('Progress Bar has borders and no value', () => {
      render(<ProgressBar withBorder />);
      const progressBarEl = screen.getByRole('progressbar');
      // eslint-disable-next-line testing-library/no-node-access
      expect(progressBarEl.closest('.LL-ProgressBar')).toHaveStyle(
        'border-color: 1px solid var(--color-primary-2)'
      );
    });
  });
});
