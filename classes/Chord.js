class Chord {
    constructor(root, scale) {
        let scaleCopy = scale;
        let rootIndex = scaleCopy.notes.indexOfObject(root);
        scaleCopy.notes.changeReference(rootIndex);
        let skipNote = false;
        let components = [];
        let start = scaleCopy.notes.reference;
        for (let i = 0; i < 7; i++) {
            if (!skipNote) {
                components.push(start.getData());
            }
            skipNote = !skipNote;
            start = start.getNext();
        }
        this.components = components;
        let thirdDistance = getSemitoneDifference(root, this.components[1]);
        let fifthDistance = getSemitoneDifference(root, this.components[2]);
        let seventhDistance = getSemitoneDifference(root, this.components[3]);
        switch (thirdDistance) {
            case 3: {
                this.major3rd = false;
                break;
            }
            case 4: {
                this.major3rd = true;
                break;
            }
        }
        switch (seventhDistance) {
            case 10: {
                this.major7th = false;
                break;
            }
            case 11: {
                this.major7th = true;
                break;
            }
        }
        let chordSymbol = root.toString();
        if (!this.major3rd) {
            chordSymbol += "m";
            if (!this.major7th) {
                chordSymbol += "7";
            }
        }
        else {
            if (!this.major7th) {
                chordSymbol += "7";
            }
            else {
                chordSymbol += "maj7";
            }
        }
        switch (fifthDistance) {
            case 6: {
                chordSymbol += "(b5)";
                break;
            }
            case 8: {
                chordSymbol += "(#5)";
                break;
            }
        }
        this.symbol = chordSymbol;
    }

    toString(){
        return this.symbol;
    }

    
}

