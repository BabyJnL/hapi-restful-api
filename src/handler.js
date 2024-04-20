// Import library
const { nanoid } = require('nanoid');

// Import variable
const { notes } = require('./notes.js');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16); // generate a random unique string
    const createdAt = new Date().toISOString(); // fill with current date
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

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const note = notes.filter(note => note.id === id)[0];

    if (note !== undefined) 
        return {
            status: 'success',
            data: {
                note
            }
        }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan'
    });

    response.code(404);
    return response;
}

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;

    const updatedAt = new Date().toISOString(); // renew updatedAt

    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        return {
            status: 'success',
            message: 'Catatan berhasil diperbaharui'
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbaharui catatan. Id tidak ditemukan'
    });

    response.code(404);
    return response;
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler
}