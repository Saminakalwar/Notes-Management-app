import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from '../components/PasswordInput';

describe('PasswordInput', () => {
  it('toggles password visibility', () => {
    render(<PasswordInput id="password" name="password" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/••••••••/i);
    const toggleBtn = screen.getByRole('button');
    expect(input.type).toBe('password');
    fireEvent.click(toggleBtn);
    expect(input.type).toBe('text');
  });
});
