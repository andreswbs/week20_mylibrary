const mongoose = require('mongoose')

const Author = require('../model/author')
const Book = require('../model/book')

const mongodbConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`

mongoose.connect(mongodbConnection)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection failed'))

function _makeAuthor(dbAuthor)  {
    return {
        id: dbAuthor._id,
        name: dbAuthor.name,
        birthYear: dbAuthor.birth_year
    }
}

function _makeBook(dbBook) {
    return {
        id: dbBook._id,
        title: dbBook.title,
        releaseYear: dbBook.release_year,
        authorId: dbBook.author_id
    }
}

async function patchTable(pool, table, fieldMapping, id, req) {
    throw Error("implement this function!")
}

async function getBooks() {
    const dbBooks = await Book.find({})
    return dbBooks.map((dbBook) => _makeBook(dbBook))
}
async function getAuthors() {
    const dbAuthors = await Author.find({})
    return dbAuthors.map((dbAuthor) => _makeAuthor(dbAuthor))
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

async function insertBook(update ) {
     const newBook = await Book.create({
        title: update.title,
        release_year: update.releaseYear,
        author_id: update.authorId
     })

     return _makeBook(newBook)
    
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