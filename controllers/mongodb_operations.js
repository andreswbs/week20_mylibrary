

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

function insertAuthor(pool, update ) {
    throw Error("implement this function!")
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