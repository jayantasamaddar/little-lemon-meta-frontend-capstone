import { render, screen } from '@testing-library/react';

import { Error } from './Error';

describe('components/Error', () => {
  describe('<Error />', () => {
    it('Rendered in the DOM', () => {
      render(<Error />);
      const ErrorEl = screen.getByRole('alert');
      expect(ErrorEl).toBeInTheDocument();
    });
  });
});
