// dependencies
const express = require('express')
const fs = require('fs')
const path = require('path')
const notesDB = require('./db/db.json')

// server configuration
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// html routes

// default page
app.get('/', function (req, res) {
    res.sendFile(__dirname, './public/index.html')
})

// notes page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// api routes

// GET all notes
app.get('/api/notes', function (req, res) {
    res.json(notesDB)
})

// POST note
app.post('/api/notes', function (req, res) {
    let newPost = req.body

    // read data from db
    fs.readFile('./db/db.json', "utf8", (err, data) =>{
        if (err) console.log(err)
        console.log(data)
        // parse into object
        let note = JSON.parse(data)
        // assigning an id so we can delete by id later
        // +1 to make it simple so first post starts at 1 instead of 0
        newPost.id = note.length + 1
        // console.log('parsed', note)
        // console.log('stringify', note)
        note.push(newPost)
        // stringify then write to db
        note = JSON.stringify(note)
        
        fs.writeFileSync('./db/db.json', note, function(err) {
            if (err) console.log(err)
            res.json(note)
        })
    })
})

// DELETE note
app.delete('/api/notes/:id', function(req, res) {
    let deleteID = req.params.id
    // creating a temp object that will return every note that DOES NOT match the deleteID
    tempDB = notesDB.filter((tempDB) => {
        return tempDB.id != deleteID
    })
    console.log('temp', tempDB)
    // stringify and write to db
    tempDB = JSON.stringify(tempDB)
    fs.writeFileSync('./db/db.json', tempDB, function(err) {
        if (err) console.log(err)
        res.json(tempDB)
    })
})

// start server, begins listening..
app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT) + "..."
})