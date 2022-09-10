

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

module.exports = {patchTable}