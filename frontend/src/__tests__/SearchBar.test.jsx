import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import { vi } from "vitest";

describe("SearchBar", () => {
  test("renders input and triggers onChange", () => {
    const mockChange = vi.fn();
    render(<SearchBar value="" onChange={mockChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search Notes..."), {
      target: { value: "abc" },
    });
    expect(mockChange).toHaveBeenCalled();
  });

test("shows clear button when value present", () => {
  render(<SearchBar value="test" onChange={() => {}} onClearSearch={() => {}} />);
  const icons = screen.getAllByTestId(/icon/i);
  expect(icons.length).toBeGreaterThan(0);
});

});
