let divFinder = document.getElementById('finderButtons');
let divNotes = document.getElementById('selectedNotes');
let addNoteButton = document.getElementById('addNoteButton');
let deleteNoteButton = document.getElementById('deleteNoteButton');
deleteNoteButton.style.display = 'none';
let selectedNotes = [];

let foundChord = '<h1> *still cooking* </h1>';

function displaySelectedNotes() {
    let selectedNotesString = "<h2> Notes: </h2>";
    selectedNotes.forEach(note => {
        selectedNotesString = selectedNotesString.slice(0, selectedNotesString.length - 5) + ' •' + note.toString() + '  ' + '</h2>';
    });
    divNotes.innerHTML = selectedNotesString;
    divNotes.style.display = 'block';
}

function deleteNote() {
    selectedNotes.pop();
}

function findChord() {
    divOutput.innerHTML = foundChord;
    //TODO
}

addNoteButton.addEventListener('click', function () {
    let myNote = noteBuilder(noteValue, flat, sharp);
    selectedNotes.push(myNote);
    if (selectedNotes.length != 0) {
        deleteNoteButton.style.display = 'inline-block';
        if (selectedNotes.length > 2) {
            findChord();
            if (selectedNotes.length > 6) {
                addNoteButton.style.display = 'none';
            }
        }
        else{
            clearOutput();
        }
    }
    displaySelectedNotes();
});

deleteNoteButton.addEventListener('click', function(){
    deleteNote();
    displaySelectedNotes();
    if (selectedNotes.length > 2) {
        findChord();
    }
    else{
        clearOutput();
    }
    if (selectedNotes.length < 7) {
        addNoteButton.style.display = 'inline-block';
        if(selectedNotes.length == 0){
            deleteNoteButton.style.display = 'none';
        }
    }
    displaySelectedNotes();
});