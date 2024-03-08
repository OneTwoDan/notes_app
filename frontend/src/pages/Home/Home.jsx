import { useEffect, useState } from "react";
import NoteForm from "../../components/NoteForm/NoteForm";
import NoteList from "../../components/NoteList/NoteList";
import UpdateNote from "../../components/UpdateNote/UpdateNode";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleNoteUpdate = async (updatedNote) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCloseUpdateModal = () => {
    setSelectedNote(null);
    setUpdateModalOpen(false);
  };

  const handleNoteSubmit = async () => {
    fetchNotes();
  };

  const handleNoteArchive = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${id}/archive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to archive note");
      }
      fetchNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  return (
    <div>
      <NoteForm onSubmit={handleNoteSubmit} />
      <NoteList
        notes={notes}
        onDelete={handleDeleteNote}
        onUpdate={handleNoteUpdate}
        onArchive={handleNoteArchive}
      />
      {selectedNote && (
        <UpdateNote
          open={updateModalOpen}
          onClose={handleCloseUpdateModal}
          onUpdate={handleNoteUpdate}
          note={selectedNote}
        />
      )}
    </div>
  );
};

export default Home;
