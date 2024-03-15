class Note {
    constructor(symbol, flat, sharp, calculate) {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        this.flat = flat;
        this.sharp = sharp;
        let index = notes.indexOf(symbol);
        let halfStep = false;
        if (flat) {
            this.symbol = symbol + "b";
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
            this.symbol = symbol + "#";
            if(calculate){
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
            this.symbol = symbol;
            this.equivalent = null;
        }
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
