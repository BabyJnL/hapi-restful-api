const { addNoteHandler, getAllNotesHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: (req, h) => {

        }
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: (req, h) => {

        }
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: (req, h) => {

        }
    }
]

module.exports = routes;