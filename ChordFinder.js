let divFinder = document.getElementById('finderButtons');
let divNotes = document.getElementById('selectedNotes');
let divWarning = document.getElementById('warning');
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
    noteGraph.remove(selectedNotes.pop());
}

function findChord() {
    let rule = ["C", "D", "E", "F", "G", "A", "B"];
    let noteOrder = [noteBuilder("C", false, false), noteBuilder("C", false, true), noteBuilder("D", false, false), noteBuilder("D", false, true), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("F", false, true), noteBuilder("G", false, false), noteBuilder("G", false, true), noteBuilder("A", false, false), noteBuilder("A", false, true), noteBuilder("B", false, false)];
    let pseudoScale = new CircularLinkedList();
    let selectedNotesCopy = [...selectedNotes];
    selectedNotesCopy.sort((a, b) => {
        let indexA = noteOrder.findIndex(object => object.toString() === a.toString() || object.toString() === a.equivalent.toString());
        let indexB = noteOrder.findIndex(object => object.toString() === b.toString() || object.toString() === b.equivalent.toString());
        return indexA - indexB;
    });
    pseudoScale.addAll(selectedNotesCopy);
    let elementCount = pseudoScale.size;
    let start = pseudoScale.reference;
    let adjacent = start.next;
    for (let i = 0; i < elementCount; i++) {
        let notesInBetween = rule.indexOf(start.data.symbol) - rule.indexOf(adjacent.data.symbol);
        if (notesInBetween > 0) {
            notesInBetween = 7 - notesInBetween;
        }
        notesInBetween = Math.abs(notesInBetween) - 1;
        if (notesInBetween > 0) {
            fillWithNull(start, adjacent, notesInBetween);
        }
        start = adjacent;
        adjacent = start.next;
    }

    let possibleRoots = findPossibleRoots();
    let possibleChords = [];

    divOutput.innerHTML = noteGraph.toString();
    divOutput.innerHTML += '<br> Possible roots: ' + possibleRoots;
    divOutput.innerHTML += '<br> Truncated scale: ' + pseudoScale;
}

function fillWithNull(node1, node2, count) {
    let nullNode = new DoubleLinkNode();
    nullNode.setData(null);
    nullNode.setPrevious(node1);
    node1.setNext(nullNode);
    if (count > 1) {
        for (let i = 0; i < count - 1; i++) {
            let current = new DoubleLinkNode();
            current.setData(null);
            current.setPrevious(nullNode);
            nullNode.setNext(current);
            nullNode = current;
        }
    }
    nullNode.setNext(node2);
    node2.setPrevious(nullNode);
}

function findPossibleRoots() {
    let intervals = noteGraph.edges;
    let possibleRoots = [];
    if (intervals.has(7) && intervals.get(7).length > 0) {
        for (let interval of intervals.get(7)) {   // looking for perfect fifths
            possibleRoots.push(interval.source.content);
        }
    }
    else if ((intervals.has(6) && intervals.get(6).length > 0) || (intervals.has(8) && intervals.get(8).length > 0)) { //if perfect fifths don't appear, look for altered fifths
        if (intervals.has(6)) {
            for (let interval of intervals.get(6)) {
                possibleRoots.push(interval.source.content);
            }
        }
        if (intervals.has(8)) {
            for (let interval of intervals.get(8)) {
                possibleRoots.push(interval.source.content);
            }
        }
    }
    else if ((intervals.has(3) && intervals.get(3).length > 0) || (intervals.has(4) && intervals.get(4).length > 0)) { //if still nothing, triads can't be formed. proceed by searching for thirds
        if (intervals.has(3)) {
            for (let interval of intervals.get(3)) {
                possibleRoots.push(interval.source.content);
            }
        }
        if (intervals.has(4)) {
            for (let interval of intervals.get(4)) {
                possibleRoots.push(interval.source.content);
            }
        }
    }
    else { // if not even thirds can be found, just pick the first note as root and calculate whatever the hell just got input'd
        possibleRoots.push(noteGraph.vertices[0].content);
    }
    possibleRoots = possibleRoots.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
    return possibleRoots;
}

addNoteButton.addEventListener('click', function () {
    clearWarning();
    let myNote = noteBuilder(noteValue, flat, sharp);
    let duplicate = false;
    let changesLeft = 2;
    for (let note of selectedNotes) {
        if (myNote.equals(note) || myNote.equivalent.equals(note)) {
            duplicate = true;
            divWarning.innerHTML = '<h2>The note you tried to input is already in the selection</h2>';
            break;
        }
        if (myNote.symbol === note.symbol) {
            myNote = myNote.equivalent;
            changesLeft--;
            for (let note2 of selectedNotes) {
                if (myNote.symbol === note2.symbol) {
                    changesLeft--;
                }
            }
        }
        if (changesLeft === 0 || myNote.equivalent === undefined) {
            duplicate = true;
            divWarning.innerHTML = '<h2>The note you tried to input is not valid for the current selection</h2>';
            break;
        }
    }
    if (!duplicate) {
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
    clearWarning();
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

function clearWarning() {
    while (divWarning.firstChild) {
        divWarning.removeChild(divWarning.firstChild);
    }
};