const express = require('express')
const router = express.Router()
const Token = require('../middleware/verifyToken')
const noteController =require('../controller/noteController')

// get all notes
router.get('/note',noteController.getAllNotes)
router.get('/note/:id', noteController.getNoteById)
router.post('/note/save',Token.verifyToken,noteController.createNote)
router.put('/note/update/:id',Token.verifyToken, noteController.updateNote)
router.delete('/note/delete/:id',Token.verifyToken, noteController.deleteNote)

module.exports = router;