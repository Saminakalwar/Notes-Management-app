import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "../App.jsx";
import { AuthProvider } from "../contexts/AuthContext";
import { ProfileProvider } from "../contexts/ProfileContext";
import { NotesProvider } from "../contexts/NotesContext";

test("renders App without crashing", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AuthProvider>
        <NotesProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </NotesProvider>
      </AuthProvider>
    </MemoryRouter>
  );
});
