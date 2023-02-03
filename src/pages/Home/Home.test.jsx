import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';

describe('components/Home', () => {
  describe('<Home />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );
      const mainEl = screen.getByRole('region');
      expect(mainEl).toBeInTheDocument();
    });
  });
});
