import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('components/Header', () => {
  describe('Default Header - Screen width greater than 768px', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const HeaderEl = screen.getByRole('region');
      expect(HeaderEl).toBeInTheDocument();
    });

    it('Default Header Elements present', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const logo = screen.getByRole('banner');
      const menubars = screen.getAllByRole('menubar');
      expect(logo).toBeInTheDocument();
      expect(menubars.length).toStrictEqual(2);
    });
  });

  describe('Mobile Header - When screen width less than 768px', () => {
    beforeEach(() => {
      global.innerWidth = 500;
      global.dispatchEvent(new Event('resize'));
    });

    it('Mobile Header Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const HeaderEl = screen.getByRole('region');
      expect(HeaderEl).toBeInTheDocument();
    });

    it('Mobile Header Elements are present in their default state', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const logo = screen.getByRole('banner');
      const burgerButton = screen.getByRole('button');
      const menubars = screen.getAllByRole('menubar');
      expect(logo).toBeInTheDocument();
      expect(burgerButton).toBeInTheDocument();
      expect(burgerButton).toHaveAttribute('aria-label', 'Open the Menu');
      expect(burgerButton).toHaveAttribute('aria-pressed', 'false');
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(menubars.length).toStrictEqual(1); // One is hidden by default
    });

    it('Mobile Header Elements are present when Burger Menu is opened', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const burgerButton = screen.getByRole('button');
      fireEvent.click(burgerButton);

      const logo = screen.getByRole('banner');
      const menubars = screen.getAllByRole('menubar');

      expect(logo).toBeInTheDocument();
      expect(burgerButton).toBeInTheDocument();
      expect(burgerButton).toHaveAttribute('aria-label', 'Close the Menu');
      expect(burgerButton).toHaveAttribute('aria-pressed', 'true');
      expect(burgerButton).toHaveAttribute('aria-expanded', 'true');
      // The second menu is visible now that it is expanded
      expect(menubars.length).toStrictEqual(2);
    });

    it('Escape to close Burger Menu', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const burgerButton = screen.getByRole('button');
      fireEvent.click(burgerButton);

      expect(burgerButton).toHaveAttribute('aria-expanded', 'true'); // Menu has opened

      fireEvent.keyUp(burgerButton, { key: 'Escape' });
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false'); // Menu has closed
    });

    it('Click outside to close Burger Menu', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );

      const burgerButton = screen.getByRole('button');
      const logo = screen.getByRole('banner');

      fireEvent.click(burgerButton);

      expect(burgerButton).toHaveAttribute('aria-expanded', 'true'); // Menu has opened

      fireEvent.click(logo);
      expect(burgerButton).toHaveAttribute('aria-expanded', 'false'); // Menu has closed
    });
  });
});
