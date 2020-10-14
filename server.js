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




// const readNote = fs.readFileSync(__dirname, notes, (err, data) => {
//     if (err) console.log(error)
// })


// const writeNote = function(note) {
//     fs.writeFileSync(__dirname, notes), (err, data) => {
//         if (err) console.log(err)
//     }
// }

// html routes

// default page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
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
    // assigning an id so we can delete by id later
    // +1 to make it simple so first post starts at 1 instead of 0
    newPost.id = readDB.length + 1
    readNotes.push(newPost)
    writeNotes(readNotes)
    return res.json(readNotes)
})

// fs.readFileSync(path.join(__dirname, './db/db.json'), (err, data) => {
//     if (err) console.log(error)

//     fs.writeFile(noteFile, JSON.stringify(currentNotes), (err) => { if (err) throw err;
//         res.json(currentNotes);

// DELETE note
app.delete('/api/notes/:id', function(req, res) {
    let deleteID = req.params.id
    readDB = readDB.filter((note) => {
        return note.id != deleteID
    })
    writeNotes(readNotes)
    return res.json(readNotes)
})

// start server, begins listening..
app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT) + "..."
})