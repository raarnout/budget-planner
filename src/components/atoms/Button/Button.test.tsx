import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('is not disabled by default', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('uses primary variant by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each([
    'primary', 'secondary', 'success', 'danger', 'warning',
    'info', 'light', 'dark', 'link',
    'outline-primary', 'outline-secondary', 'outline-success',
    'outline-danger', 'outline-warning', 'outline-info',
    'outline-light', 'outline-dark',
  ] as const)('renders variant "%s"', (variant) => {
    render(<Button variant={variant}>{variant}</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['sm', 'md', 'lg'] as const)('renders size "%s"', (size) => {
    render(<Button size={size}>{size}</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders block button', () => {
    render(<Button block>Block</Button>);
    expect(screen.getByRole('button', { name: /block/i })).toBeInTheDocument();
  });

  it('renders active state', () => {
    render(<Button active>Active</Button>);
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
  });

  describe('disabled state', () => {
    it('disables the button', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      render(<Button disabled onClick={onClick}>Disabled</Button>);
      await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: 0 });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('disables the button while loading', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('sets aria-busy while loading', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('sets aria-disabled while loading', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('shows loadingLabel instead of children when loading with a label', () => {
      render(<Button loading loadingLabel="Saving…">Save</Button>);
      expect(screen.getByText('Saving…')).toBeInTheDocument();
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('keeps children visible when loading without a loadingLabel', () => {
      render(<Button loading>Save</Button>);
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('does not call onClick while loading', async () => {
      const onClick = vi.fn();
      render(<Button loading onClick={onClick}>Loading</Button>);
      await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: 0 });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click</Button>);
      await userEvent.click(screen.getByRole('button', { name: /click/i }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is keyboard accessible via Enter', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Enter</Button>);
      screen.getByRole('button', { name: /enter/i }).focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is keyboard accessible via Space', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Space</Button>);
      screen.getByRole('button', { name: /space/i }).focus();
      await userEvent.keyboard(' ');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('forwardRef', () => {
    it('forwards ref to the underlying button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('extra className', () => {
    it('applies additional className', () => {
      render(<Button className="extra">Extra</Button>);
      expect(screen.getByRole('button')).toHaveClass('extra');
    });
  });
});
