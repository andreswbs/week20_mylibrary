require('dotenv').config()

const {
    patchTable, 
    getBooks, 
    getOneBook, 
    getAuthors,
    deleteAuthor,
    deleteBook,
    updateAuthor,
    insertBook,
    insertAuthor
} = require('./controllers/mongodb_operations')
//const {patchTable} = require('./controllers/mongodb_operations')
//import * from 'dotenv' 

const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

const port = process.env.PORT || 8080

function sendErrorOutput(err, res) {
    res.status(400).send({
        errors: [err.message],
    })
}

app.get('/', (req, res) => {
    res.render('greeting')
})

app.get('/api/book', (req, res ) => {
    getBooks()
    .then((books) => {res.json(books)})
    .catch (err => sendErrorOutput(err, res))
})

app.get('/api/author', (req, res ) => {
    getAuthors()
    .then((authors) => {res.json(authors)})
    .catch (err => sendErrorOutput(err, res))
})

app.get('/api/book/:id', (req, res ) => {
    const { id } = req.params
    getOneBook(id)
    .then((data) => {res.json(data)})
    .catch (err => sendErrorOutput(err, res))
})

app.delete('/api/author/:id', (req, res) => {
    const { id } = req.params
    deleteAuthor(id)
    .then(() => {res.send({status: 'deleted'})})
    .catch (err => sendErrorOutput(err, res))
})

app.delete('/api/book/:id', (req, res) => {
    const { id } = req.params
    deleteBook(id)
    .then(() => {res.send({status: 'deleted'})})
    .catch (err => sendErrorOutput(err, res))
})

app.put('/api/author/:id', (req, res) => {
    const { id } = req.params

    if (!req.body.name || !req.body.birthYear) {
        return res.status(400).send({error: "name or birthYear is missing. Check API documentation"})
    }

    updateAuthor(id, req.body)
    .then((updatedData) => {res.send(updatedData)})
    .catch (err => sendErrorOutput(err, res))
})

app.patch('/api/author/:id', (req, res) => {
    const { id } = req.params
    const fieldMapping = {
        name: 'name',
        birthYear: 'birth_year'
    }

    patchTable('author', fieldMapping, id, req)
    .then(() => {
        res.send({status: 'updated'})
    })
    .catch (err => sendErrorOutput(err, res))
})

app.patch('/api/book/:id', (req, res) => {
    const { id } = req.params
    const fieldMapping = {
        releaseYear: 'release_year',
        title: 'title',
        authorId: 'author_id'
    }

    patchTable('books', fieldMapping, id, req)
    .then(() => {
        res.send({status: 'updated'})
    })
    .catch (err => sendErrorOutput(err, res))
})

app.get('/blog', (req, res  ) => {
    res.send(
        [
            {
                blogId: 3,
                title: 'Blog post title',
                content: 'adsfasdfasdfa',
                mainPicUrl: 'http://????????????????'
            },
            {}
        ]
    )
})

app.post('/api/book', (req, res) => {
    insertBook(req.body)
    .then((data) => {res.status(201).send(data)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.post('/api/author', (req, res) => {
    insertAuthor(req.body)
    .then((data) => {res.status(201).send(data)})
    .catch (err => sendErrorOutput(err, res))
})
    
app.listen(port, () => console.log('Ready and connected'))