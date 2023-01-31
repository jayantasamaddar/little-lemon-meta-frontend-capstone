import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Error } from './Error';

describe('components/Error', () => {
  describe('<Error />', () => {
    it('Rendered in the DOM', () => {
      render(<Error />);
      const ErrorEl = screen.getByTestId('ll-error');
      expect(ErrorEl).toBeInTheDocument();
    });
  });
});
