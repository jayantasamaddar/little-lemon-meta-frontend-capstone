import { render, screen } from '@testing-library/react';

import { Label } from './Label';

describe('components/Label', () => {
  describe('<Label />', () => {
    it('Rendered in the DOM', () => {
      render(<Label>Label</Label>);
      const LabelEl = screen.getByText(/^Label$/);
      expect(LabelEl).toBeInTheDocument();
    });
  });
});
