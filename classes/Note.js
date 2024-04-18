class Note {
    constructor(symbol, flat, sharp, calculate) {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        this.symbol = symbol;
        this.flat = flat;
        this.sharp = sharp;
        let index = notes.indexOf(symbol);
        let halfStep = false;
        if (flat) {
            if (calculate) {
                if (symbol === "C" || symbol === "F") {
                    halfStep = true;
                }
                if (symbol === "C") {
                    this.equivalent = new Note("B", false, !halfStep, false);
                }
                else {
                    this.equivalent = new Note(notes[index - 1], false, !halfStep, false);
                }
            }
        }
        else if (sharp) {
            if (calculate) {
                if (symbol === "B" || symbol === "E") {
                    halfStep = true;
                }
                if (symbol === "B") {
                    this.equivalent = new Note("C", !halfStep, false, false);
                }
                else {
                    this.equivalent = new Note(notes[index + 1], !halfStep, false, false);
                }
            }
        }
        else {
            if (symbol === "B") {
                this.equivalent = new Note("C", true, false, false);
            }
            else if (symbol === "C") {
                this.equivalent = new Note("B", false, true, false);
            }
            else if (symbol === "E") {
                this.equivalent = new Note("F", true, false, false);
            }
            else if (symbol === "F") {
                this.equivalent = new Note("E", false, true, false);
            }
            else {
                this.equivalent = null;
            }

        }
    }
    equals(element) {
        if(this == null || element == null){
            return false;
        }
        if(this.symbol === element.symbol && this.flat === element.flat && this.sharp === element.sharp){
            return true;
        }
    }

    toString() {
        let string = this.symbol;
        if (this.flat) {
            string += "♭";
        }
        else if (this.sharp) {
            string += "♯";
        }
        return string;
    }
}

function noteBuilder(symbol, flat, sharp) {
    let note = new Note(symbol, flat, sharp, true);
    if (note.equivalent !== null) {
        note.equivalent.equivalent = note;
    }
    else {
        note.equivalent = new Note("N/A", false, false, false);
    }
    return note;
}

function getSemitoneDifference(note1, note2) {
    if(note1 == null || note2 == null){
        return null;
    }
    let allNotes = new CircularLinkedList();
    let notesArray = [noteBuilder("C", false, false), noteBuilder("C", false, true), noteBuilder("D", false, false), noteBuilder("D", false, true), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("F", false, true), noteBuilder("G", false, false), noteBuilder("G", false, true), noteBuilder("A", false, false), noteBuilder("A", false, true), noteBuilder("B", false, false)];
    allNotes.addAll(notesArray);
    let note1Index = 0;
    let note2Index = 0;
    let note1found = false;
    let note2found = false;
    let current = allNotes.reference;
    if (note1.equals(current.getData()) || note1.equals(current.getData().equivalent)) {
        note1found = true;
    }
    if (note2.equals(current.getData()) || note2.equals(current.getData().equivalent)) {
        note2found = true;
    }
    if (!note1found) {
        note1Index++;
    }
    if (!note2found) {
        note2Index++;
    }
    current = current.getNext();
    while (current !== allNotes.reference && (!note1found || !note2found)) {
        if (!note1found && (note1.equals(current.getData()) || note1.equals(current.getData().equivalent))) {
            note1found = true;
        }
        if (!note2found && (note2.equals(current.getData()) || note2.equals(current.getData().equivalent))) {
            note2found = true;
        }
        if (!note1found) {
            note1Index++;
        }
        if (!note2found) {
            note2Index++;
        }
        current = current.getNext();
    }
    let difference = note2Index - note1Index;
    if (difference < 0) {
        difference = 12 + difference;
    }
    return difference;
}
