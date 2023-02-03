import { render, screen } from '@testing-library/react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Icon } from './Icon';

describe('components/Icon', () => {
  describe('<Icon />', () => {
    it('Rendered in the DOM', () => {
      render(<Icon src={faTimes} />);
      const IconEl = screen.getByRole('presentation');
      expect(IconEl).toBeInTheDocument();
    });
  });
});
