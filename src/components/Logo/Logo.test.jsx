import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Logo } from './Logo';

describe('components/Logo', () => {
  describe('<Logo />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Logo />
        </BrowserRouter>
      );
      const LogoEl = screen.getByRole('banner');
      expect(LogoEl).toBeInTheDocument();
    });
  });
});
