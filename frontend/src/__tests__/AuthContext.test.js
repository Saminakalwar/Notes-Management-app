import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import API from "../services/api";
import { vi } from "vitest";

vi.mock("../services/api");

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("loads stored user from localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Samina" }));
    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper: AuthProvider,
    });
    expect(result.current.user.name).toBe("Samina");
  });

  it("logs in user successfully", async () => {
    API.post.mockResolvedValue({
      data: { user: { name: "Samina" }, token: "abc123" },
    });

    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login("test@mail.com", "Password123!");
    });

    expect(result.current.user.name).toBe("Samina");
    expect(localStorage.getItem("token")).toBe("abc123");
  });

  it("logs out and clears storage", async () => {
    localStorage.setItem("token", "abc123");
    const { result } = renderHook(() => React.useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      result.current.logout();
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(result.current.user).toBeNull();
  });
});
