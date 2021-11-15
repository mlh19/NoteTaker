const util = require("util");
const fs = require("fs");
const readFileAsyn = util.promisify(fs.readFile);
const writeFileAsyn = until.promisify(fs.writeFile);

class Notes {
    constructor() {
        this.idDum = 0; 
    }
    read () {
        return readFileAsyn("./db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsyn("./db/db.json", JSON.stringify(note))
    }
    getNotes() {
        console.log("get notes");
        return this.read().then(notes => {
            let notesArray;
            try {
                notesArray = [].concat(JSON.parse(notes));
            }
            catch (err) {
                notesArray = [];
            }
            return notesArray;
        })
    }
    addNotes(note) {
        console.log("add notes");
        const { title, text } = note;
        const newNote = { title, text, id: ++this.idDum}
        return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updateNotes => this.write(updateNotes))
        .then(() => newNote)
    }
    removeNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(updateNotes => this.write(updateNotes))
    }
}

module.exports = new Notes();
