import { useState, useEffect } from "react";
import { Modal, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

import "./updateNode.css";

const UpdateNote = ({ open, onClose, onUpdate, note }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdate = () => {
    onUpdate({ id: note.id, title, content });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2>Update Note</h2>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          className="modal"
        >
          Update
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginLeft: "10px" }}
          className="modal"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

UpdateNote.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default UpdateNote;
