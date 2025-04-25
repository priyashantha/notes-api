const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.use(auth);

// GET all notes
router.get('/', async (req, res) => {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
});

// POST a new note
router.post('/', async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        user: req.user // ← associate with logged-in user
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
});

// GET a single note
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: 'Note not found or unauthorized' });
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: 'Invalid update request' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!deletedNote) return res.status(404).json({ message: 'Note not found or unauthorized' });
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid delete request' });
    }
});


module.exports = router;
