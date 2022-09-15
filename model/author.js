const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String,
    birth_year: Number
})

module.exports = mongoose.model('Author', authorSchema)
