import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('components/Card', () => {
  describe('<Card />', () => {
    it('Rendered in the DOM', () => {
      render(
        <Card>
          <div data-testid="test-card"></div>
        </Card>
      );
      const CardEl = screen.getByRole('article');
      expect(CardEl).toBeInTheDocument();
    });
  });
});
