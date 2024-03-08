const Note = require('../models/Note');

const notesController = {
    async getAllNotes(req, res) {
        try {
            const notes = await Note.findAll();
            res.json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            res.status(500).json({ message: 'An error occurred while fetching notes.' });
        }
    },
    async createNote(req, res) {
        try {
            const { title, content } = req.body;
            const newNote = await Note.create({ title, content });
            res.status(201).json(newNote);
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async updateNote(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const [updated] = await Note.update({ title, content }, { where: { id } });
            if (updated) {
                const updatedNote = await Note.findByPk(id);
                res.status(200).json(updatedNote);
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } catch (error) {
            console.error('Error updating note:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async deleteNote(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Note.destroy({ where: { id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async archiveNote(req, res) {
        try {
            const { id } = req.params;
            const note = await Note.findByPk(id);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            note.archived = !note.archived;
            await note.save();

            const message = note.archived ? 'Note archived successfully' : 'Note unarchived successfully';

            res.status(200).json({ message });
        } catch (error) {
            console.error('Error archiving note:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = notesController;
