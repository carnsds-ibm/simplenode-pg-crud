const Router = require('express-promise-router')
const db = require('../db')

const router = Router()

module.exports = router

router.get('/items/table-create', async (req, res) => {
    await db.query('DROP TABLE IF EXISTS items; CREATE TABLE items (item_id INTEGER PRIMARY KEY, item_name VARCHAR (30) NOT NULL);')
    res.send("Table created successfully");
})

router.put('/items/update', async (req, res) => {
    const {item_id, item_name} = req.body;
    try {
        if (item_name) {
            const result = await db.query(`UPDATE items SET item_name = '${item_name}' WHERE item_id = '${item_id}'`, [])
            if (result.rowCount <= 0) throw new Error()
            res.send(`Item name for id: ${item_id}, ${item_name}, updated in db.`)
        } else {
            res.send(`DB UPDATE on ${item_name} with id: ${item_id} unsuccessful`)
        }
    } catch (error) {
        console.log(`ERROR OCCURRED WHEN DELETING OBJECT: ${item_name}`)
        res.status(500)
        res.send(`Could not delete object: ${item_name} in DB!`)
    }
})

router.post('/items/create', async (req, res) => {
    const {item_id, item_name} = req.body;
    if (!item_id) {
        res.status(500)
        res.send("Invalid Object data to be inserted. Required item id.")
    }

    if (!item_name) {
        res.status(500)
        res.send("Invalid Object data to be inserted. Required item name.")
    }

    try {
        const result = await db.query('INSERT INTO items(item_id, item_name)VALUES($1, $2);', [item_id, item_name])
        if (result.code === '23505') throw new Error();
        res.send(`Successfully Added new item, ${item_name}, into db.`)
    } catch (error) {
        console.log(error)
        console.log("ERROR: COULD NOT INSERT INTO DB: " + JSON.stringify(req.body));
        res.status(500)
        res.send(`Could not insert object, ${JSON.stringify(req.body)}, into db. (May already exist)`)
    }
})

router.get('/items/:name', async (req, res) => {

    const item_name = req.params.name;
    try {
        if (item_name === "all") {
            const result = await db.query(`SELECT * FROM items`, [])
            res.send('DB RESULT: ' + JSON.stringify(result.rows))
        } else if (item_name) {
            const result = await db.query(`SELECT * FROM items WHERE item_name = '${item_name}'`, [])
            if (!result.rows[0]) throw new Error()
            res.send('DB RESULT: ' + JSON.stringify(result.rows[0])) 
        } else {
            res.send('NO DB RESULT COULD BE FOUND')
        }
    } catch (error) {
        console.log(`ERROR OCCURRED WHEN RETRIEVING OBJECT: ${item_name}`)
        res.status(500)
        res.send(`Could not find object: ${item_name} in DB!`)
    }
})

router.delete('/items/:name', async (req, res) => {

    const item_name = req.params.name;
    try {
        if (item_name) {
            const result = await db.query(`DELETE FROM items WHERE item_name = '${item_name}'`, [])
            if (result.rowCount <= 0) throw new Error()
            res.send(`Object, ${item_name}, deleted from db.`)
        } else {
            res.send(`NO DB RESULT COULD BE FOUND for DELETE on ${item_name}`)
        }
    } catch (error) {
        console.log(`ERROR OCCURRED WHEN DELETING OBJECT: ${item_name}`)
        res.status(500)
        res.send(`Could not delete object: ${item_name} in DB!`)
    }
})
