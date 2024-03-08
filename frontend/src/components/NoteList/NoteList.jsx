import { useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import UpdateNote from "../UpdateNote/UpdateNode";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";

import "./noteList.css";

const NoteList = ({ notes, onDelete, onUpdate, onArchive }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleDelete = async (id) => {
    try {
      onDelete(id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleOpenUpdateModal = (note) => {
    setSelectedNote(note);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedNote(null);
  };

  const handleNoteUpdate = async (updatedNote) => {
    try {
      onUpdate(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const updatedNote = notes.find((note) => note.id === id);
      updatedNote.archived = !updatedNote.archived;
      await onArchive(updatedNote);
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const filteredNotes =
    filter === "active"
      ? notes.filter((note) => !note.archived)
      : filter === "archived"
      ? notes.filter((note) => note.archived)
      : notes;

  return (
    <div>
      <div className="filters">
        <Button
          onClick={() => setFilter("all")}
          variant="contained"
          className="filter-button"
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("active")}
          variant="contained"
          className="filter-button"
        >
          Active
        </Button>
        <Button
          onClick={() => setFilter("archived")}
          variant="contained"
          className="filter-button"
        >
          Archived
        </Button>
      </div>
      <div className="cards-container">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            style={{ marginBottom: 20 }}
            className={`card-container ${note.archived ? "archived" : ""}`}
          >
            <div className="card-content">
              <div>
                <div>{note.title}</div>
                <div>{note.content}</div>
              </div>
              <div>
                <div>
                  <Button
                    onClick={() => handleDelete(note.id)}
                    variant="contained"
                    className="actions"
                    startIcon={<DeleteIcon />}
                  ></Button>
                  <Button
                    onClick={() => {
                      handleOpenUpdateModal(note);
                      onUpdate(note);
                    }}
                    variant="contained"
                    className="actions"
                    startIcon={<EditIcon />}
                  ></Button>
                  <Button
                    onClick={() => handleArchive(note.id)}
                    variant="contained"
                    className="actions"
                    startIcon={<ArchiveIcon />}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <UpdateNote
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleNoteUpdate}
        note={selectedNote}
      />
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
