import { render, screen } from '@testing-library/react';

import { Main } from './Main';

describe('components/Main', () => {
  window.scrollTo = jest.fn();
  describe('<Main />', () => {
    afterEach(() => jest.clearAllMocks());
    it('Window scroll to the top is working', () => {
      render(<Main></Main>);
      const mainEl = screen.getByRole('region');
      expect(mainEl).toBeInTheDocument();
      expect(window.scrollTo).toBeCalledTimes(1);
    });
  });
});
