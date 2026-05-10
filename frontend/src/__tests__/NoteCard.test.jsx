import { render, screen, fireEvent } from "@testing-library/react";
import NoteCard from "../components/NoteCard";
import { vi } from "vitest";

describe("NoteCard", () => {
  beforeAll(() => {
    window.confirm = vi.fn(() => true);
  });

  it("calls onEdit when edit icon clicked", () => {
    const mockEdit = vi.fn();
    render(
      <NoteCard
        title="Test"
        content="note"
        date="Today"
        onEdit={mockEdit}
        onDelete={() => {}}
      />
    );

    const editIcon = screen.getByTestId("edit-icon");
    fireEvent.click(editIcon);
    expect(mockEdit).toHaveBeenCalled();
  });

  it("calls onDelete when confirmed", () => {
    const mockDelete = vi.fn();
    render(
      <NoteCard
        title="Test"
        content="note"
        date="Today"
        onEdit={() => {}}
        onDelete={mockDelete}
      />
    );

    const deleteIcon = screen.getByTestId("delete-icon");
    fireEvent.click(deleteIcon);
    expect(mockDelete).toHaveBeenCalled();
  });
});
