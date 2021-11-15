const router = require('express').Router(); //import router (built into express)
const path = require("path");
const fs = require("fs");
const noteData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


//API ROUTE: GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req, res) => res.json(noteData));

//API ROUTE: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {

  req.body.id = uuidv4();
  noteData.push(req.body)
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData));
  return res.status(200).json(noteData)
})

// API ROUTE: DELETE /api/notes/:id
router.delete('/api/notes/:id', (req, res) => {
  const deletedId = req.params.id
  // delete a category by its `id` value
  noteData = noteData.filter(note => {
    if(deletedId === note.id) {
      return false;
    } else {
      return true;
    }
  })
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData));
  return res.status(200).json(noteData)
});

module.exports = router;