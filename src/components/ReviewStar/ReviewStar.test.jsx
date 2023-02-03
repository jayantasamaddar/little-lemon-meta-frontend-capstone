import { render, screen } from '@testing-library/react';

import { ReviewStar } from './ReviewStar';

describe('components/ReviewStar', () => {
  describe('<ReviewStar />', () => {
    it('Rendered in the DOM', () => {
      render(<ReviewStar />);
      const reviewStarEl = screen.getByRole('presentation');
      expect(reviewStarEl).toBeInTheDocument();
    });
  });
});
