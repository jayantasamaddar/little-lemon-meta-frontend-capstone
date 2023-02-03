import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from './Hero';

/** Mock useNavigate */
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('components/Hero', () => {
  describe('<Hero />', () => {
    it('Rendered in the DOM', () => {
      render(
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      );
      const heroHeadingEl = screen.getByText('Little Lemon');
      expect(heroHeadingEl).toBeInTheDocument();
    });

    it('Button functionality', () => {
      render(
        <BrowserRouter>
          <Hero />
        </BrowserRouter>
      );
      const buttonEl = screen.getByRole('button');
      fireEvent.click(buttonEl);
      expect(mockedUsedNavigate).toBeCalledTimes(1);
    });
  });
});
