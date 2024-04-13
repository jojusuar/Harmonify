let divFinder = document.getElementById('finderButtons');
let divNotes = document.getElementById('selectedNotes');
let addNoteButton = document.getElementById('addNoteButton');
let deleteNoteButton = document.getElementById('deleteNoteButton');
deleteNoteButton.style.display = 'none';
let selectedNotes = [];
let noteGraph = new Graph(true);

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
    //divOutput.innerHTML = foundChord;
    divOutput.innerHTML = noteGraph.toString();
    //TODO
    //1.build directed graph of notes
    //2.search for 7 semitones edge. if exists, source of the edge is the root
    //3.search for 6 semitones edge. if exists, vertex with shortest path to the other avoiding the edges that bind them is the root
    //4.search for all 8 semitones edge. if exists, pick the first involved note to appear in the array as the root
    //5.if none of the above, just pick first note in the array as root.
}

addNoteButton.addEventListener('click', function () {
    let myNote = noteBuilder(noteValue, flat, sharp);
    let duplicate = false;
    for (let note of selectedNotes) {
        if (myNote.equals(note)) {
            duplicate = true;
            break;
        }
    }
    if(!duplicate){
        selectedNotes.push(myNote);
        noteGraph.cartesianAddition(myNote);
    }
    if (selectedNotes.length != 0) {
        deleteNoteButton.style.display = 'inline-block';
        if (selectedNotes.length > 2) {
            findChord();
            if (selectedNotes.length > 6) {
                addNoteButton.style.display = 'none';
            }
        }
        else {
            clearOutput();
        }
    }
    displaySelectedNotes();
});

deleteNoteButton.addEventListener('click', function () {
    deleteNote();
    displaySelectedNotes();
    if (selectedNotes.length > 2) {
        findChord();
    }
    else {
        clearOutput();
    }
    if (selectedNotes.length < 7) {
        addNoteButton.style.display = 'inline-block';
        if (selectedNotes.length == 0) {
            deleteNoteButton.style.display = 'none';
        }
    }
    displaySelectedNotes();
});