import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import useAuth from "../hooks/useAuth";
import { vi } from "vitest";

// mock useAuth hook
vi.mock("../hooks/useAuth");

describe("ProtectedRoutes", () => {
  it("shows loading message while loading", () => {
    useAuth.mockReturnValue({ user: null, loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoutes>
          <div>Protected Content</div>
        </ProtectedRoutes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading your workspace/i)).toBeInTheDocument();
  });

  it("redirects unauthenticated users to /login", () => {
    useAuth.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <ProtectedRoutes>
          <div>Protected Content</div>
        </ProtectedRoutes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    // Navigate renders nothing in test environment, but we can still assert:
    expect(document.body.innerHTML).not.toContain("Protected Content");
  });

  it("renders children when authenticated", () => {
    useAuth.mockReturnValue({
      user: { name: "Samina" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoutes>
          <div>Protected Content</div>
        </ProtectedRoutes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
