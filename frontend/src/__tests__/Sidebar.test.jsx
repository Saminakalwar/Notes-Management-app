import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('Sidebar', () => {
  it('renders expanded sidebar', () => {
    render(<MemoryRouter><Sidebar collapsed={false} setCollapsed={vi.fn()} /></MemoryRouter>);
    expect(screen.getByText(/Notes App/i)).toBeInTheDocument();
  });

  it('toggles collapse', () => {
    const mockSetCollapsed = vi.fn();
    render(<MemoryRouter><Sidebar collapsed={false} setCollapsed={mockSetCollapsed} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetCollapsed).toHaveBeenCalled();
  });
});
