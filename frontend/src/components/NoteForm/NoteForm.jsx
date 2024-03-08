import { useState } from "react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import PropTypes from "prop-types";

import Logo from "../../assets/images/logo.png";
import "./noteForm.css";

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit note");
      }

      setTitle("");
      setContent("");

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  return (
    <div>
      <div className="logo-container">
        <img className="logo" src={Logo} alt="logo" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="title">
            <TextField
              fsx={{ width: "200px" }}
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="content">
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Create a note"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                className="submit"
                size="large"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NoteForm;
