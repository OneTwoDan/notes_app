const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/notes', notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);
router.put('/notes/:id/archive', notesController.archiveNote);

module.exports = router;
