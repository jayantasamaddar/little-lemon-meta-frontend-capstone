import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('components/Heading', () => {
  describe('<Heading />', () => {
    const inputVal = 'Hello World';
    it('Rendered in the DOM', () => {
      render(<Heading>{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toBeInTheDocument();
    });

    it('h1', () => {
      render(<Heading tag="h1">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl.tagName).toBe('H1');
      expect(HeadingEl).toHaveClass('text-xl');
    });

    it('h2 - Default', () => {
      render(<Heading tag="h2">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toHaveClass('text-lg');
      expect(HeadingEl).toHaveClass('left');
    });

    it('h3', () => {
      render(<Heading tag="h3">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toHaveClass('text-m');
    });

    it('h4', () => {
      render(<Heading tag="h4">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toHaveClass('text-base');
    });

    it('h5', () => {
      render(<Heading tag="h5">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toHaveClass('text-standard');
    });

    it('h6', () => {
      render(<Heading tag="h6">{inputVal}</Heading>);
      const HeadingEl = screen.getByText(inputVal);
      expect(HeadingEl).toHaveClass('text-sm');
    });
  });
});
