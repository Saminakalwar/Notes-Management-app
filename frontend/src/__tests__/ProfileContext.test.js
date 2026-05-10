import React from "react";
import { renderHook, act } from "@testing-library/react";
import { ProfileProvider, ProfileContext } from "../contexts/ProfileContext";
import API from "../services/api";
import toast from "react-hot-toast";
import { vi } from "vitest";

// ✅ Mock API and toast once globally
vi.mock("../services/api");
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// ✅ Stable mocks for hooks (used by ProfileContext)
vi.mock("../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({ user: { name: "Samina" }, logout: vi.fn() }),
}));

vi.mock("../hooks/useNotes", () => ({
  __esModule: true,
  default: () => ({ notes: [], fetchNotes: vi.fn() }),
}));

describe("ProfileContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches profile successfully", async () => {
    API.get.mockResolvedValue({
      data: {
        user: {
          profileData: { fullname: "Samina" },
          profilePic: "pic.jpg",
        },
      },
    });

    const { result } = renderHook(() => React.useContext(ProfileContext), {
      wrapper: ProfileProvider,
    });

    await act(async () => {
      await result.current.fetchProfile();
    });

    expect(result.current.profileData.fullname).toBe("Samina");
    expect(result.current.profilePic).toBe("pic.jpg");
  });

  it("updates profile successfully", async () => {
    API.put.mockResolvedValue({
      data: {
        user: {
          profileData: { fullname: "Updated" },
        },
      },
    });

    const { result } = renderHook(() => React.useContext(ProfileContext), {
      wrapper: ProfileProvider,
    });

    await act(async () => {
      await result.current.updateProfile({ fullname: "Updated" });
    });

    expect(result.current.profileData.fullname).toBe("Updated");
    expect(toast.success).toHaveBeenCalledWith("Profile updated successfully!");
  });
});
