const util = require("util");
const fs = require("fs");
const { runInThisContext } = require("vm");
const readFileAsyn = until.promisify(fs.readFile);
const writeFileAsyn = until.promisify(fs.writeFile);

class Notes {
    constructor(){
        this.idDum = 0 
    }
    read () {
        return readFileAsyn("./db/db.json");
    }
    write(note) {
        return writeFileAsyn("./db/db.json", JSON.stringify(note))
    }
    getNotes() {
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
