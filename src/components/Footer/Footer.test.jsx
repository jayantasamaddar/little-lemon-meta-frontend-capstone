import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('components/Footer', () => {
  describe('<Footer />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );
      const FooterEl = screen.getByRole('region');
      expect(FooterEl).toBeInTheDocument();
    });
  });
});
