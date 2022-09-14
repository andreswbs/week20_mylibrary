

async function patchTable(pool, table, fieldMapping, id, req) {
    // updates  [{field: 'name', value: 'Changed Name'}, {field: 'address', value: 'New York'}, {field: phone, value: '23423423'}]
    const updates = Object.keys(req.body).map((param) => {
        return {
            field: fieldMapping[param],
            value: req.body[param]
        }
    })

    let updateQuery = [id]
    let updateFields = []
    updates.forEach((element, index) => {
        updateQuery.push(element.value)
        updateFields.push(element.field + "=$" + (index + 2))
    });

    console.log('req.body', req.body)
    console.log('updateQuery', updateQuery)
    console.log('updateFields', updateFields)

    sql = `
    UPDATE ${table} 
    SET ${updateFields.toString(', ')} 
    WHERE id=$1`

    console.log('sql',sql)
    return pool.query(sql, updateQuery)
}

function getBooks(pool) {
    return pool.query(`
        SELECT books.title, books.id as book_id, books.release_year, author.id as author_id, author.name
        FROM books
        LEFT JOIN author ON author.id = books.author_id;`)
    .then((data) => { 
        return(data.rows)}
    )
}
function getAuthors(pool) {
    return pool.query(`SELECT * FROM author;`)
    .then((data) => { 
        return(data.rows)}
    )
}

function getOneBook(pool, id ) {
    return pool.query('SELECT * FROM books WHERE id=$1;', [id])
    .then((data) => { 
        return(data.rows)}
    )
}

function deleteAuthor(pool, id ) {
    return pool.query('DELETE FROM author where id=$1;', [id])
    .then((data) => { 
        return(data.rows)}
    )
}

function deleteBook(pool, id ) {
    return pool.query('DELETE FROM books where id=$1;', [id])
    .then((data) => { 
        return(data.rows)}
    )
}

function updateBook(pool, id, update ) {
    return pool.query(`
    UPDATE author
    set name=$1, birth_year=$2
    where id=$3
    returning *;
    `, [update.name, update.birthYear, id])
    .then((data) => { 
        return(data.rows)}
    )
}
function insertBook(pool, update ) {
    return pool.query(`
    insert into books (title, release_year, author_id) 
    values ($1, $2, $3)
    returning *;
    `,
    [update.title, update.releaseYear, update.authorId])
    .then((data) => { 
        return(data.rows)}
    )
}

function insertAuthor(pool, update ) {
    return pool.query(`
    insert into author (name, birth_year) 
    values ($1, $2)
    returning *;
    `,
    [update.name, update.birthYear])
    .then((data) => { 
        return(data.rows)}
    )
}

module.exports = {
    patchTable,
    getBooks,
    getOneBook,
    getAuthors,
    deleteAuthor,
    deleteBook,
    updateBook,
    insertBook,
    insertAuthor
}