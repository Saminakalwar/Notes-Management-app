import { render, screen, fireEvent } from '@testing-library/react';
import EditNotes from '../components/EditNotes';
import { vi } from 'vitest';

vi.mock("../hooks/useNotes", () => ({
  default: () => ({
    notes: [],
    fetchNotes: vi.fn(),
    addNote: vi.fn(),
    deleteNote: vi.fn(),
    updateNote: vi.fn(),
  }),
}));


describe('EditNotes Component', () => {
  const mockOnClose = vi.fn();
  const mockFetchNotes = vi.fn();

  it('shows error if title is missing', async () => {
    render(<EditNotes noteData={{}} type="add" onClose={mockOnClose} fetchNotes={mockFetchNotes} />);
    fireEvent.click(screen.getByText(/Add Note/i));
    expect(await screen.findByText(/Please enter a title/i)).toBeInTheDocument();
  });

  it('renders input and save button', () => {
    render(<EditNotes noteData={{ title: 'Note 1' }} type="edit" onClose={mockOnClose} fetchNotes={mockFetchNotes} />);
    expect(screen.getByPlaceholderText(/Enter note title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update note/i })).toBeInTheDocument();

  });
});
