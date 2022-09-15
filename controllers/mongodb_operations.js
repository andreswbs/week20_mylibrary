const mongoose = require('mongoose')

const Author = require('../model/author')

const mongodbConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`

mongoose.connect(mongodbConnection)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection failed'))

async function patchTable(pool, table, fieldMapping, id, req) {
    throw Error("implement this function!")
}

function getBooks(pool) {
    throw Error("implement this function!")
}
function getAuthors(pool) {
    throw Error("implement this function!")
}

function getOneBook(pool, id ) {
    throw Error("implement this function!")
}

function deleteAuthor(pool, id ) {
    throw Error("implement this function!")
}

function deleteBook(pool, id ) {
    throw Error("implement this function!")
}

function updateAuthor(pool, id, update ) {
    throw Error("implement this function!")
}
function insertBook(pool, update ) {
    throw Error("implement this function!")
}

async function insertAuthor(update ) {
    const newAuthor = await Author.create({
        name: update.name,
        birth_year: update.birthYear
    })
    return newAuthor
}

module.exports = {
    patchTable,
    getBooks,
    getOneBook,
    getAuthors,
    deleteAuthor,
    deleteBook,
    updateAuthor,
    insertBook,
    insertAuthor
}