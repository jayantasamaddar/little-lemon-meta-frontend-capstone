import { render, screen } from '@testing-library/react';
import { Specials } from './Specials';
import specials from '../../../../settings/cms/specials.json';

describe('components/Specials', () => {
  describe('<Specials />', () => {
    it('Rendered in the DOM', () => {
      render(<Specials data={specials} />);
      const SpecialsEl = screen.getByText('Specials');
      expect(SpecialsEl).toBeInTheDocument();
    });
  });
});
