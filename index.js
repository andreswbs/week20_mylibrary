const dotenv = require('dotenv')
const {patchTable, getBooks, getOneBook, getAuthors} = require('./controllers/db_operations')
//const {patchTable} = require('./controllers/mongodb_operations')

dotenv.config()
//import * from 'dotenv' 

const express = require('express')
const cors = require('cors')

const { Pool } = require('pg')

const app = express()
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

const port = process.env.PORT || 8080

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: true, 
    ssl: { rejectUnauthorized: false }
})

app.get('/', (req, res) => {
    res.render('greeting')
})

app.get('/api/book', (req, res ) => {
    getBooks(pool)
    .then((books) => {res.json(books)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.get('/api/author', (req, res ) => {
    getAuthors(pool)
    .then((authors) => {res.json(authors)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.get('/api/book/:id', (req, res ) => {
    const { id } = req.params
    getOneBook(pool, id)
    .then((data) => {res.json(data)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.delete('/api/author/:id', (req, res) => {
    const { id } = req.params
    pool.query('DELETE FROM author where id=$1;', [id])
    .then(() => {res.send({status: 'deleted'})})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.delete('/api/book/:id', (req, res) => {
    const { id } = req.params
    pool.query('DELETE FROM books where id=$1;', [id])
    .then(() => {res.send({status: 'deleted'})})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.put('/api/author/:id', (req, res) => {
    const { id } = req.params
    pool.query(`
    UPDATE author
    set name=$1, birth_year=$2
    where id=$3
    returning *;
    `, [req.body.name, req.body.birthYear, id])
    .then((data) => {res.send(data.rows)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.patch('/api/author/:id', (req, res) => {
    const { id } = req.params
    const fieldMapping = {
        name: 'name',
        birthYear: 'birth_year'
    }

    patchTable(pool, 'author', fieldMapping, id, req)
    .then(() => {
        res.send({status: 'updated'})
    })
})

app.patch('/api/book/:id', (req, res) => {
    const { id } = req.params
    const fieldMapping = {
        releaseYear: 'release_year',
        title: 'title',
        authorId: 'author_id'
    }

    patchTable(pool, 'books', fieldMapping, id, req)
    .then(() => {
        res.send({status: 'updated'})
    })
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
    console.log(req.body)
    pool.query(`
    insert into books (title, release_year, author_id) 
    values ($1, $2, $3)
    returning *;
    `,
    [req.body.title, req.body.releaseYear, req.body.authorId]
    )
    .then((data) => {res.status(201).send(data.rows)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})

app.post('/api/author', (req, res) => {
    console.log(req.body)
    pool.query(`
    insert into author (name, birth_year) 
    values ($1, $2)
    returning *;
    `,
    [req.body.name, req.body.birthYear]
    )
    .then((data) => {res.status(201).send(data.rows)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
})
    
app.listen(port, () => console.log('conncted to Postgre'))