import React from "react";
import { renderHook, act } from "@testing-library/react";
import { NotesProvider, NotesContext } from "../contexts/NotesContext";
import API from "../services/api";
import { vi } from "vitest";
import toast from "react-hot-toast";
// import * as toast from "react-hot-toast";


vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));



vi.mock("../services/api");

describe("NotesContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches notes successfully", async () => {
    API.get.mockResolvedValue({ data: { notes: [{ _id: 1, title: "Note 1" }] } });

    const { result } = renderHook(() => React.useContext(NotesContext), {
      wrapper: NotesProvider,
    });

    await act(async () => {
      await result.current.fetchNotes();
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].title).toBe("Note 1");
  });

  it("adds a new note and refreshes notes", async () => {
    API.post.mockResolvedValue({
      data: { note: { _id: 2, title: "New Note" } },
    });
    API.get.mockResolvedValue({
      data: { notes: [{ _id: 2, title: "New Note" }] },
    });

    const { result } = renderHook(() => React.useContext(NotesContext), {
      wrapper: NotesProvider,
    });

    await act(async () => {
      await result.current.addNote("New Note", "Test content");
    });

    expect(API.post).toHaveBeenCalledWith("/notes", {
      title: "New Note",
      content: "Test content",
    });
    expect(result.current.notes[0].title).toBe("New Note");
  });

  it("deletes a note and updates notes", async () => {
    // API.get.mockResolvedValue({ data: { notes: [] } });
    // API.delete.mockResolvedValue({});

    API.delete.mockResolvedValue({ data: { message: "Note deleted" } });
API.get.mockResolvedValue({ data: { notes: [] } }); // after delete

    const { result } = renderHook(() => React.useContext(NotesContext), {
      wrapper: NotesProvider,
    });

    await act(async () => {
  await result.current.deleteNote("1");
});

expect(API.delete).toHaveBeenCalledWith("/notes/1");
expect(toast.success).toHaveBeenCalledWith("Note deleted successfully!");



    // Mock starting state
    // await act(async () => {
    //   result.current.setNotes([{ _id: "1", title: "Old Note" }]);
    //   await result.current.deleteNote("1");
    // });

    // expect(API.delete).toHaveBeenCalledWith("/notes/1");
    // expect(result.current.notes).toHaveLength(0);
  });
});
