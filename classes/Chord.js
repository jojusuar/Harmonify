class Chord {
    constructor(root, scale, allTensions) {
        let scaleCopy = scale;
        let rootIndex = scaleCopy.notes.indexOfObject(root);
        scaleCopy.notes.changeReference(rootIndex);
        let skipNote = false;
        let components = [];
        let start = scaleCopy.notes.reference;
        for (let i = 0; i < 14; i++) {
            if (!skipNote) {
                components.push(start.getData());
            }
            skipNote = !skipNote;
            start = start.getNext();
        }
        if (!allTensions) {
            components = components.slice(0, 4);
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

        let hasNinth = false;
        let hasEleventh = false;
        let hasThirteenth = false;

        if (allTensions) {
            hasNinth = getSemitoneDifference(this.components[0], this.components[4]) === 2 || (this.major3rd && !this.major7th);
            hasEleventh = getSemitoneDifference(this.components[1], this.components[5]) === 2;
            hasThirteenth = getSemitoneDifference(this.components[2], this.components[6]) === 2;
        }

        let availableSymbols = [];
        let altered9th = false;
        let altered11th = false;
        let altered13th = false;

        if (allTensions) {
            if (hasNinth) {
                let ninthDistance = getSemitoneDifference(this.components[0], this.components[4]);
                switch (ninthDistance) {
                    case 1: {
                        availableSymbols.push("b9");
                        altered9th = true;
                        break;
                    }
                    case 2: {
                        availableSymbols.push("9");
                        break;
                    }
                }
            }
            if (hasEleventh) {
                let eleventhDistance = getSemitoneDifference(this.components[0], this.components[5]);
                switch (eleventhDistance) {
                    case 5: {
                        availableSymbols.push("11");
                        break;
                    }
                    case 6: {
                        availableSymbols.push("#11");
                        altered11th = true;
                        break;
                    }
                }
            }
            if (hasThirteenth) {
                let thirteenthDistance = getSemitoneDifference(this.components[0], this.components[6]);
                switch (thirteenthDistance) {
                    case 8: {
                        availableSymbols.push("b13");
                        altered13th = true;
                        break;
                    }
                    case 9: {
                        availableSymbols.push("13");
                        break;
                    }
                }
            }
            let indexCorrector = 0;
            if (!hasNinth) {
                components.splice(4, 1);
                indexCorrector++;
            }
            if (!hasEleventh) {
                components.splice(5 - indexCorrector, 1);
                indexCorrector++;
            }
            if (!hasThirteenth) {
                components.splice(6 - indexCorrector, 1);
            }
        }

        let extendedChordSymbol = root.toString();
        let tensionString = "";
        if (!hasNinth || altered9th) {
            tensionString += "7";
            availableSymbols.forEach(symbol => {
                tensionString += "(" + symbol + ")";
            });
        }
        else {
            if ((!hasEleventh || altered11th) && hasThirteenth) {
                if (!hasEleventh) {
                    tensionString += availableSymbols[0] + "(" + availableSymbols[1] + ")";
                }
                else {
                    tensionString += availableSymbols[0] + "(" + availableSymbols[1] + ")" + "(" + availableSymbols[2] + ")";
                }
            }
            else if (altered13th) {
                tensionString += availableSymbols[1] + "(" + availableSymbols[2] + ")";
            }
            else {
                tensionString += availableSymbols.pop();
            }
        }

        if (!this.major3rd) {
            extendedChordSymbol += "m";
            if (!this.major7th) {
                if (availableSymbols.length === 0) {
                    extendedChordSymbol += "7";
                }
                else {
                    extendedChordSymbol += tensionString;
                }
            }
            else {
                availableSymbols.forEach(symbol => {
                    extendedChordSymbol += "(add" + symbol + ")";
                });
            }
        }
        else {
            if (!this.major7th) {
                if (availableSymbols.length === 0) {
                    extendedChordSymbol += "7";
                }
                else {
                    extendedChordSymbol += tensionString;
                }
            }
            else {
                extendedChordSymbol += "maj";
                if (availableSymbols.length === 0) {
                    extendedChordSymbol += "7";
                }
                else {
                    extendedChordSymbol += tensionString;
                }
            }
        }

        switch (fifthDistance) {
            case 6: {
                extendedChordSymbol += "(b5)";
                break;
            }
            case 8: {
                extendedChordSymbol += "(#5)";
                break;
            }
        }
        this.extendedChordSymbol = extendedChordSymbol;
    }

    toString() {
        return this.extendedChordSymbol;
    }
}