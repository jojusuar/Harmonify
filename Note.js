class Note {
    constructor(symbol, flat, sharp) {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        this.flat = flat;
        this.sharp = sharp;
        let index = notes.indexOf(symbol);
        let halfStep = false;
        if(flat){
            this.symbol = symbol + "b";
            if(symbol === "C" || symbol === "F"){
                halfStep = true;
            }
            if(symbol === "C"){
                this.equivalent = new Note("B", false, !halfStep);
            }
            else{
                this.equivalent = new Note(notes[index-1], false, !halfStep);
            }
            
        }
        else if(sharp){
            this.symbol = symbol + "#";
            if(symbol === "B" || symbol === "E"){
                halfStep = true;
            }
            if(symbol === "B"){
                this.equivalent = new Note("C", !halfStep, false);
            }
            else{
                this.equivalent = new Note(notes[index+1], !halfStep, false);
            }
        }
        else{
            this.symbol = symbol;
            this.equivalent = null;
        }
    }
}

function noteBuilder(symbol, flat, sharp){
    let note = new Note(symbol, flat, sharp);
    if(note.equivalent !== null){
        note.equivalent.equivalent = note;
    }
    else{
        note.equivalent = new Note("N/A", false, false);
    }
    return note; 
}