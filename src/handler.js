// Import library
const { nanoid } = require('nanoid');

// Import variable
const { notes } = require('./notes.js');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16); // generate a random unique string
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = { id, title, createdAt, updatedAt, tags, body };
    notes.push(newNote);

    const isSuccess = notes.filter(note => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });

    response.code(500);
    return response;
}

const getAllNotesHandler = () => {
    return {
        status: 'success',
        data: {
            notes
        }
    }
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler
}