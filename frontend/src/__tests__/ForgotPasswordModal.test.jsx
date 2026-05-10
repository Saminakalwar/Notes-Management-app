import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import API from '../services/api';
import { vi } from 'vitest';

vi.mock('../services/api');

describe('ForgotPasswordModal', () => {
  it('renders when open', () => {
    render(<ForgotPasswordModal open={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
  });

  it('submits email and shows success message', async () => {
    API.post.mockResolvedValue({ data: { message: 'Reset link sent!' } });

    render(<ForgotPasswordModal open={true} onClose={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'test@mail.com' } });
    fireEvent.click(screen.getByText(/Send Reset Link/i));

    await waitFor(() => expect(screen.getByText(/Reset link sent!/i)).toBeInTheDocument());
  });
});
