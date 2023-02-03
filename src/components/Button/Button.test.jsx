import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('components/Button', () => {
  describe('<Button />', () => {
    const buttonStyles = {
      outline: 'btn-outline',
      primary: 'btn-primary',
      disabled: 'btn-disabled',
      alert: 'btn-alert',
      unstyled: 'btn-unstyled',
    };
    it('Rendered in the DOM', () => {
      render(<Button>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toBeInTheDocument();
    });

    it('Unstyled Button', () => {
      render(<Button unstyled>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toHaveClass(buttonStyles.unstyled);
    });

    it('Primary Button', () => {
      render(<Button primary>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toHaveClass(buttonStyles.primary);
    });

    it('Outline Button', () => {
      render(<Button outline>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toHaveClass(buttonStyles.outline);
    });

    it('Disabled Button', () => {
      render(<Button disabled>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toBeDisabled();
      expect(ButtonEl).toHaveClass(buttonStyles.disabled);
    });

    it('Alert Button', () => {
      render(<Button alert>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      expect(ButtonEl).toHaveClass(buttonStyles.alert);
    });

    it('Loading Button', () => {
      render(<Button loading>Button</Button>);
      const ButtonEl = screen.getByRole('button');
      // eslint-disable-next-line testing-library/no-node-access
      expect(ButtonEl.getElementsByTagName('svg')[0]).toBeInTheDocument();
    });
  });
});
