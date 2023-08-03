const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen.black("New note added!"));
  } else {
    console.log(chalk.bgYellow.black("Ops!! Title already exists"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const updatedNotes = notes.filter((note) => {
    return note.title !== title;
  });
  if (updatedNotes.length < notes.length) {
    console.log('Deleting "' + title + '" note');
    saveNotes(updatedNotes);
    console.log(chalk.bgGreen.black("Note deleted successfully"));
  } else console.log(chalk.bgRed.black("Ops!! note doesn't exists"));
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { getNotes, addNote, removeNote };
