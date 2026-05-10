import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

export default function useNotes(){
    return useContext(NotesContext);
}