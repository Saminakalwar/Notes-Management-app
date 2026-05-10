import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle', () => {
  it('toggles between light and dark mode', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });
});
