import { render, screen } from '@testing-library/react';

import { Stack } from './Stack';

describe('components/Stack', () => {
  describe('<Stack />', () => {
    it('Display Default Stack', () => {
      render(
        <Stack>
          <div role="presentation">Test 1</div>
          <div role="presentation">Test 2</div>
          <div role="presentation">Test 3</div>
        </Stack>
      );
      const StackEl = screen.getByRole('group');
      expect(StackEl).toBeInTheDocument();
    });

    it('Display Vertical Stack', () => {
      render(
        <Stack vertical>
          <div role="presentation">Test 1</div>
          <div role="presentation">Test 2</div>
          <div role="presentation">Test 3</div>
        </Stack>
      );
      const StackEl = screen.getByRole('group');
      expect(StackEl).toBeInTheDocument();
      expect(StackEl).toHaveStyle({
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'flex-start',
      });
    });
  });
});
