const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: String,
    release_year: Number,
    author_id: String
})

module.exports = mongoose.model('Book', bookSchema)
