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
    clearOutput();
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
        fillWithNull(pseudoScale, start, adjacent, notesInBetween);
        start = adjacent;
        adjacent = start.next;
    }
    let dummy = new Scale();
    dummy.notes = pseudoScale;
    let possibleRoots = findPossibleRoots();
    divOutput.innerHTML += '<h2>Possible chords: </h2>';
    for (let root of possibleRoots) {
        let chord = new Chord(root, dummy, true, false);
        divOutput.innerHTML += '<button class="chord-button"><h1>' + chord.toString() + '</h1></button>';
    }
    let chordButtons = document.querySelectorAll('.chord-button');
    chordButtons.forEach(button => {
        button.addEventListener('click', () => {
            chordButtons.forEach(btn => {
                btn.style.backgroundColor = 'rgb(39, 40, 41)';
            });
            button.classList.add('selected');
            button.style.backgroundColor = 'rgb(70, 70, 70)';
        });
    });
}

function fillWithNull(list, node1, node2, count) {
    if (count < 1) {
        return;
    }
    let nullNode = new DoubleLinkNode();
    nullNode.setData(null);
    nullNode.setPrevious(node1);
    node1.setNext(nullNode);
    list.size++;
    if (count > 1) {
        for (let i = 0; i < count - 1; i++) {
            let current = new DoubleLinkNode();
            current.setData(null);
            current.setPrevious(nullNode);
            nullNode.setNext(current);
            list.size++;
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
                let augmentedFifth = interval.target.content;
                if (intervals.has(3) && intervals.get(3).length > 0) { //if still nothing, triads can't be formed. proceed by searching for thirds
                    for (let interval2 of intervals.get(3)) {
                        if (augmentedFifth.equals(interval2.source.content)) {
                            possibleRoots.push(augmentedFifth); //A minor 3rd and augmented 5th triad is an inversion of a major triad where the 5th is the root
                        }
                    }
                }
                else {
                    possibleRoots.push(interval.source.content);
                }
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

function clearWarning() {
    while (divWarning.firstChild) {
        divWarning.removeChild(divWarning.firstChild);
    }
};

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