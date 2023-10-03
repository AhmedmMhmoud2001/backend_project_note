const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteModel = new Schema({
  title:{ type: String},
  body:   { type: String},
  createdBy:{ type: String},
  date: { type: Date, default: Date.now }
});
const Note = mongoose.model('note', noteModel);
module.exports = Note;