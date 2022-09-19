const mongoose = require('mongoose')

const Author = require('../model/author')
const book = require('../model/book')
const Book = require('../model/book')

const mongodbConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`

mongoose.connect(mongodbConnection)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection failed'))

function _makeAuthor(dbAuthor)  {
    return {
        id: dbAuthor._id.toString(),
        name: dbAuthor.name,
        birthYear: dbAuthor.birth_year
    }
}

function _makeBook(dbBook) {
    return {
        id: dbBook._id.toString(),
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
    const authors = await getAuthors()
    const allBooks = dbBooks.map((dbBook) => {
        const apiBook = _makeBook(dbBook)
        const author = authors.find((el) => el.id === apiBook.authorId)
        apiBook.author = author
        return apiBook
    })
    return allBooks
}

async function getAuthors() {
    const dbAuthors = await Author.find({})
    return dbAuthors.map((dbAuthor) => _makeAuthor(dbAuthor))
}

async function getOneBook(id) {
    const dbBook = await Book.findById(id)
    const apiBook = _makeBook(dbBook)
    const author = await getOneAuthor(apiBook.authorId)
    apiBook.author = author
    return apiBook
}

async function getOneAuthor(id) {
    let author
    try {
        author = await Author.findById(id)
    } catch (e) {
        console.log("Error when getting author: " + e.message)
        return null;
    }
    return _makeAuthor(author)
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
    insertAuthor,
    getOneAuthor
}