const Note =require('../model/note.model')
exports.getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find();
        res.send(notes)
    }
    catch(err){
        res.status(404).json({ err: err.message });

    }
}
exports.getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) throw new Error('note not found')
        res.json(note)
    }
    catch(err){
        res.status(404).json({ err: err.message });

    } 
}
exports.createNote = async (req, res) => {
    try{
        const note = new Note(req.body);
        await note.save();
        res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
exports.updateNote = async (req, res) => {
    try {
        const updateNote = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id, updateNote, { new: true });

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.send(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.deleteNote = async (req, res) => {
    try{
       const note = await Note.findByIdAndDelete(req.params.id);
       if(!note) throw new Error('note not found');
       res.json({message:"note deleted"})
    }catch(err){
        res.status(404).json({ err: err.message });
    }
}
