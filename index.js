const dotenv = require('dotenv')
dotenv.config()
//import * from 'dotenv' 

const express = require('express')
const { Pool } = require('pg')

const app = express()
app.set('view engine', 'ejs')

const books = [
    {
        author: 'Mark Twain',
        title: 'Huckleberry Finn',
        releaseYear: 1884
    },
    {
        author: 'Frank Herbert',
        title: 'Dune',
        releaseYear: 1965
    }
]

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
    pool.query('SELECT * FROM books;')
    .then((data) => {res.json(data)})
    .catch((err) => {
        res.status(400).send({
            error: err.message
        })
    })
    
})

app.listen(port, () => console.log('conncted to Postgre'))