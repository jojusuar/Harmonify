class Chord {
    constructor(root, scale, allTensions, availableTensions) {
        let scaleCopy = scale;
        let rootIndex = scaleCopy.notes.indexOfObject(root);
        scaleCopy.notes.changeReference(rootIndex);
        let components = scaleCopy.notes.toArray();

        let second = false;
        let minorThird = false;
        let majorThird = false;
        let fourth = false;
        let diminishedFifth = false;
        let perfectFifth = false;
        let augmentedFifth = false;
        let majorSixth = false;
        let minorSeventh = false;
        let majorSeventh = false;
        let flatNinth = false;
        let perfectNinth = false;
        let sharpNinth = false;
        let perfectEleventh = false;
        let sharpEleventh = false;
        let flatThirteenth = false;
        let perfectThirteenth = false;
        let sharpThirteenth = false;

        let note2nd;
        let noteMinor3rd;
        let noteMajor3rd;
        let note4th;
        let noteDiminished5th;
        let note5th;
        let noteAugmented5th;
        let noteMajor6th;
        let noteMinor7th;
        let noteMajor7th;
        let noteFlat9th;
        let note9th;
        let noteSharp9th;
        let note11th;
        let noteSharp11th;
        let noteFlat13th;
        let note13th;
        let noteSharp13th;

        for (let i = 1; i < components.length; i++) {
            let note = components[i];
            let distance = getSemitoneDifference(root, note);
            switch (distance) { //calculating the interval formed from the root to each note
                case null: {
                    break;
                }
                case 1: {
                    flatNinth = true;
                    noteFlat9th = note;
                    break;
                }
                case 2: {
                    second = true;
                    note2nd = note;
                    break;
                }
                case 3: {
                    minorThird = true;
                    noteMinor3rd = note;
                    break;
                }
                case 4: {
                    majorThird = true;
                    noteMajor3rd = note;
                    break;
                }
                case 5: {
                    fourth = true;
                    note4th = note;
                    break;
                }
                case 6: {
                    diminishedFifth = true;
                    noteDiminished5th = note;
                    break;
                }
                case 7: {
                    perfectFifth = true;
                    note5th = note;
                    break;
                }
                case 8: {
                    augmentedFifth = true;
                    noteAugmented5th = note;
                    break;
                }
                case 9: {
                    majorSixth = true;
                    noteMajor6th = note;
                    break;
                }
                case 10: {
                    minorSeventh = true;
                    noteMinor7th = note;
                    break;
                }
                case 11: {
                    majorSeventh = true;
                    noteMajor7th = note;
                    break;
                }
            }
        }

        let stopFlat9th = false;
        if (availableTensions && getSemitoneDifference(root, noteFlat9th) != 2) {
            flatNinth = false;
            stopFlat9th = true;
        }

        //some important properties
        let diminished = !second && minorThird && !majorThird && !fourth && diminishedFifth && !perfectFifth && !augmentedFifth && !minorSeventh && !majorSeventh && !flatNinth && !perfectNinth && !perfectEleventh && !flatThirteenth && !sharpThirteenth; //basically, if any interval's tonal distance is not divisible by 3 it breaks the diminished property, and at least minor 3rd and b5 must be present
        let brokenTriad = !second && !minorThird && !majorThird && !fourth;
        let powerChord = brokenTriad && perfectFifth;
        let has7th = minorSeventh || majorSeventh;

        let availableSymbols = [];  //storing all tensions and alterations
        if (has7th) {
            availableSymbols.push('(7)');
        }
        if (flatNinth && allTensions && !stopFlat9th) {
            availableSymbols.push('(b9)');
        }

        if (second && (minorThird || majorThird)) { //deducing the 9th
            second = false;
            perfectNinth = true;
            note9th = note2nd;
            let rollback = false;
            if (availableTensions && getSemitoneDifference(root, note9th) != 2) {
                perfectNinth = false;
                rollback = true;
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(9)');
            }
        }
        if (minorThird && majorThird) { //deducing the sharp 9th
            minorThird = false;
            sharpNinth = true;
            noteSharp9th = noteMinor3rd;
            let rollback = false;
            if (availableTensions && getSemitoneDifference(root, noteSharp9th) != 2) {
                sharpNinth = false;
                rollback = true;
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(#9)');
            }
        }
        if (fourth && (minorThird || majorThird)) { //deducing the 11th
            fourth = false;
            perfectEleventh = true;
            note11th = note4th;
            let rollback = false;
            if (availableTensions) {
                if (minorThird && getSemitoneDifference(noteMinor3rd, note11th) != 2) {
                    perfectEleventh = false;
                    rollback = true;
                }
                else if (majorThird && getSemitoneDifference(noteMajor3rd, note11th) != 2) {
                    perfectEleventh = false;
                    rollback = true;
                }
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(11)');
            }
        }
        if (perfectFifth && diminishedFifth && !brokenTriad) { //deducing the sharp 11th
            diminishedFifth = false;
            sharpEleventh = true;
            noteSharp11th = noteDiminished5th;
            let rollback = false;
            if (availableTensions) {
                if (minorThird && getSemitoneDifference(noteMinor3rd, noteSharp11th) != 2) {
                    sharpEleventh = false;
                    rollback = true;
                }
                else if (majorThird && getSemitoneDifference(noteMajor3rd, noteSharp11th) != 2) {
                    sharpEleventh = false;
                    rollback = true;
                }
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(#11)');
            }
        }
        if (augmentedFifth && (diminishedFifth || perfectFifth)) { //deducing  the flat 13th
            augmentedFifth = false;
            flatThirteenth = true;
            noteFlat13th = noteAugmented5th;
            let rollback = false;
            if (availableTensions) {
                if (diminishedFifth && getSemitoneDifference(noteDiminished5th, noteFlat13th) != 2) {
                    flatThirteenth = false;
                    rollback = true;
                }
                else if (perfectFifth && getSemitoneDifference(note5th, noteFlat13th) != 2) {
                    flatThirteenth = false;
                    rollback = true;
                }
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(b13)');
            }
        }
        if (majorSixth && (minorSeventh || majorSeventh)) { //deducing the 13th
            majorSixth = false;
            perfectThirteenth = true;
            note13th = noteMajor6th;
            let rollback = false;
            if (availableTensions) {
                if (diminishedFifth && getSemitoneDifference(noteDiminished5th, note13th) != 2) {
                    perfectThirteenth = false;
                    rollback = true;
                }
                else if (perfectFifth && getSemitoneDifference(note5th, note13th) != 2) {
                    perfectThirteenth = false;
                    rollback = true;
                }
                else if (augmentedFifth && getSemitoneDifference(noteAugmented5th, note13th) != 2) {
                    perfectThirteenth = false;
                    rollback = true;
                }
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(13)');
            }
        }
        if (minorSeventh && majorSeventh) { //deducing the sharp 13th
            minorSeventh = false;
            sharpThirteenth = true;
            noteSharp13th = noteMinor7th;
            let rollback = false;
            if (availableTensions) {
                if (diminishedFifth && getSemitoneDifference(noteDiminished5th, noteSharp13th) != 2) {
                    sharpThirteenth = false;
                    rollback = true;
                }
                else if (perfectFifth && getSemitoneDifference(note5th, noteSharp13th) != 2) {
                    sharpThirteenth = false;
                    rollback = true;
                }
                else if (augmentedFifth && getSemitoneDifference(noteAugmented5th, noteSharp13th) != 2) {
                    sharpThirteenth = false;
                    rollback = true;
                }
            }
            if (allTensions && !rollback) {
                availableSymbols.push('(#13)');
            }
        }

        components = [root]; //parsing the confirmed components
        if (second) {
            components.push(note2nd);
        }
        if (minorThird) {
            components.push(noteMinor3rd);
        }
        if (majorThird) {
            components.push(noteMajor3rd);
        }
        if (fourth) {
            components.push(note4th);
        }
        if (diminishedFifth) {
            components.push(noteDiminished5th);
        }
        if (perfectFifth) {
            components.push(note5th);
        }
        if (augmentedFifth) {
            components.push(noteAugmented5th);
        }
        if (majorSixth) {
            components.push(noteMajor6th);
        }
        if (minorSeventh) {
            components.push(noteMinor7th);
        }
        if (majorSeventh) {
            components.push(noteMajor7th);
        }
        if (allTensions) {
            if (flatNinth) {
                components.push(noteFlat9th);
            }
            if (perfectNinth) {
                components.push(note9th);
            }
            if (sharpNinth) {
                components.push(noteSharp9th);
            }
            if (perfectEleventh) {
                components.push(note11th);
            }
            if (sharpEleventh) {
                components.push(noteSharp11th);
            }
            if (flatThirteenth) {
                components.push(noteFlat13th);
            }
            if (perfectThirteenth) {
                components.push(note13th);
            }
            if (sharpThirteenth) {
                components.push(noteSharp13th);
            }
        }
        this.components = components;

        let symbol = root.toString();

        if (diminished) { //triad calculation
            symbol += 'dim';
        }
        else if (minorThird) {
            symbol += 'm';
        }
        else if (powerChord) {
            symbol += '5';
        }

        let tensionString = ''; //tension calculation
        let breakpoint;
        if (has7th && perfectNinth && perfectEleventh && perfectThirteenth && allTensions) {
            tensionString += '13';
        }
        else if (has7th && perfectNinth && perfectEleventh && allTensions) {
            breakpoint = 3;
            tensionString += '11';
        }
        else if (has7th && perfectNinth && allTensions) {
            breakpoint = 2;
            tensionString += '9';
        }
        else if (has7th) {
            breakpoint = 1;
            tensionString += '7';
        }
        else {
            breakpoint = 0;
        }


        let alterationString = ''; // build the alteration string with everything after the tension stack stopped
        for (let i = breakpoint; i < availableSymbols.length; i++) {
            alterationString += availableSymbols[i];
        }

        if (majorSixth) { //6th calculation
            if (minorThird || powerChord) {
                symbol += '(maj6)';
            }
            else {
                symbol += 'maj6';
            }
        }
        else if (minorSeventh) { //7th calculation (the stacking of 7th-9th-11th-13th goes here)
            if (powerChord) {
                symbol += '(' + tensionString + ')';
            }
            else {
                symbol += tensionString;
            }
        }
        else if (majorSeventh) {
            if (minorThird || powerChord) {
                symbol += '(maj' + tensionString + ')';
            }
            else {
                symbol += 'maj' + tensionString + '';
            }
        }

        if (!majorThird) { //suspensions calculation
            if (second) {
                symbol += 'sus2';
            }
            else if (fourth) {
                symbol += 'sus4';
            }
        }

        if (diminishedFifth && !diminished) { //alterations calculation (everything after breaking the 7th-9th-11th-13th order also goes here)
            symbol += '(b5)';
        }
        else if (augmentedFifth) {
            symbol += '(#5)';
        }
        symbol += alterationString;

        if (brokenTriad && !powerChord) { //if no 3rd or suspension is present
            symbol += '(no3)';
        }

        this.symbol = symbol;
    }

    toString() {
        return this.symbol;
    }
}