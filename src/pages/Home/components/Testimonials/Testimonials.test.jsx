import { render, screen } from '@testing-library/react';
import { Testimonials } from './Testimonials';
import testimonials from '../../../../settings/cms/testimonials.json';

describe('components/Testimonials', () => {
  describe('<Testimonials />', () => {
    it('Rendered in the DOM', () => {
      render(<Testimonials data={testimonials} />);
      const TestimonialsEl = screen.getByText('Testimonials');
      expect(TestimonialsEl).toBeInTheDocument();
    });
  });
});
