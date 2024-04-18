class Note {
    constructor(symbol, flat, sharp, doubleFlat, doubleSharp) {
        this.symbol = symbol;
        this.flat = flat;
        this.sharp = sharp;
        this.doubleFlat = doubleFlat;
        this.doubleSharp = doubleSharp;
    }

    equals(element) {
        if (this == null || element == null) {
            return false;
        }
        if (this.toString() === element.toString()) {
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
        else if (this.doubleFlat) {
            string += "𝄫";
        }
        else if (this.doubleSharp) {
            string += "𝄪";
        }
        return string;
    }
}

let equivalencyMap = new Map(); //manually mapping the equivalences may seem hacky, but the overhead and code complexity caused by calculating them all back and forth wasn't worth it
equivalencyMap.set(0, [new Note("C", false, false, false, false), new Note("B", false, true, false, false), new Note("D", false, false, true, false)]);
equivalencyMap.set(1, [new Note("C", false, true, false, false), new Note("D", true, false, false, false), new Note("B", false, false, false, true)]);
equivalencyMap.set(2, [new Note("D", false, false, false, false), new Note("C", false, false, false, true), new Note("E", false, false, true, false)]);
equivalencyMap.set(3, [new Note("D", false, true, false, false), new Note("E", true, false, false, false), new Note("F", false, false, true, false)]);
equivalencyMap.set(4, [new Note("E", false, false, false, false), new Note("F", true, false, false, false), new Note("D", false, false, false, true)]);
equivalencyMap.set(5, [new Note("F", false, false, false, false), new Note("E", false, true, false, false), new Note("G", false, false, true, false)]);
equivalencyMap.set(6, [new Note("F", false, true, false, false), new Note("G", true, false, false, false), new Note("E", false, false, false, true)]);
equivalencyMap.set(7, [new Note("G", false, false, false, false), new Note("F", false, false, false, true), new Note("A", false, false, true, false)]);
equivalencyMap.set(8, [new Note("G", false, true, false, false), new Note("A", true, false, false, false)]);
equivalencyMap.set(9, [new Note("A", false, false, false, false), new Note("G", false, false, false, true), new Note("B", false, false, true, false)]);
equivalencyMap.set(10, [new Note("A", false, true, false, false), new Note("B", true, false, false, false), new Note("C", false, false, true, false)]);
equivalencyMap.set(11, [new Note("B", false, false, false, false), new Note("C", true, false, false, false), new Note("A", false, false, false, true)]);

function getSemitoneDifference(note1, note2) {
    if (note1 == null || note2 == null) {
        return null;
    }
    let pos1;
    let pos2;
    let found1 = false;
    let found2 = false;
    for (let position of equivalencyMap.keys()) {
        if (found1 && found2) {
            break;
        }
        for (let note of equivalencyMap.get(position)) {
            if (!found1 && note1.equals(note)) {
                pos1 = parseInt(position);
                found1 = true;
            }
            if (!found2 && note2.equals(note)) {
                pos2 = parseInt(position);
                found2 = true;
            }
        }
    }
    let difference = pos2 - pos1;
    if (difference < 0) {
        difference = 12 + difference;
    }
    return difference;
}

function equivalents(note1) {
    for (let position of equivalencyMap.keys()) {
        for (let note2 of equivalencyMap.get(position)) {
            if (note1.equals(note2)) {
                return equivalencyMap.get(position).filter(element => !element.equals(note1));
            }
        }
    }
    return [];
}

function getNext(note, distance) {
    if (distance > 4 || distance < 1) { //at most, a note can only have the next be 4 semitones apart to stick to the note rule
        return null;
    }
    let rule = ["C", "D", "E", "F", "G", "A", "B"];
    let circle = new CircularLinkedList();
    circle.addAll(rule);
    let expectedNext;
    let current = circle.reference;
    for (let i = 0; i < circle.size; i++) {
        if(current.data == note.symbol){
            expectedNext = current.getNext().data;
            break;
        }
        current = current.getNext();
    }
    for (let position of equivalencyMap.keys()) {
        for (let note2 of equivalencyMap.get(position)) {
            if (note.equals(note2)) {
                let position2 = parseInt(position)+distance;
                if(position2 > 11){
                    position2 = position2 - 12;
                }
                for(let candidate of equivalencyMap.get(position2)){
                    if(candidate.symbol == expectedNext){
                        return candidate;
                    }
                }
                return null;
            }
        }
    }
    return null;
}