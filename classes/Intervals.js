class Intervals {
    constructor(name, mode) {
        this.name = name;
        let intervalArray;
        let modeArray;
        if (name === "DIATONIC") {
            intervalArray = [2, 2, 1, 2, 2, 2, 1];
            modeArray = ['I. Ionian (major)', 'II. Dorian', 'III. Phrygian', 'IV. Lydian', 'V. Mixolydian', 'VI. Aeolian (minor)', 'VII. Locrian'];
        }
        if (name === "PENTATONIC") {
            intervalArray = [2, 2, 3, 2, 3];
            modeArray = ['Pentatonic major', 'Suspended', 'Blues minor', 'Blues major', 'Pentatonic minor'];
        }
        if (name === "MELODIC_ASC") {
            intervalArray = [2, 1, 2, 2, 2, 2, 1];
            modeArray = ['I. Jazz minor', 'II. Dorian ♭2', 'III. Lydian augmented', 'IV. Acoustic (Lydian dominant)', 'V. Aeolian dominant', 'VI. Half-diminished', 'VII. Altered dominant'];
        }
        if (name === "HARMONIC_MAJOR") {
            intervalArray = [2, 2, 1, 2, 1, 3, 1];
            modeArray = ['I. Ionian ♭6', 'II. Dorian ♭5', 'III. Phrygian ♭4', 'IV. Lydian ♭3', 'V. Mixolydian ♭2', 'VI. Lydian augmented ♯2', 'VII. Locrian ♭♭7'];
        }
        if (name === "HARMONIC_MINOR") {
            intervalArray = [2, 1, 2, 2, 1, 3, 1];
            modeArray = ['I. Aeolian ♯7', 'II. Locrian ♮6', 'III. Ionian ♯5', 'IV. Dorian ♯4', 'V. Phrygian dominant', 'VI. Lydian ♯2', 'VII. Super-Locrian'];
        }
        if (name === "BYZANTINE") {
            intervalArray = [1, 3, 1, 2, 1, 3, 1];
            modeArray = ['I. Double harmonic major', 'II. Lydian ♯2 ♯6', 'III. Ultraphrygian', 'IV. Gypsy minor', 'V. Oriental', 'VI. Ionian ♯2 ♯5', 'VII. Locrian ♭♭3 ♭♭7'];
        }
        if (name === "NEAPOLITAN_MAJOR") {
            intervalArray = [1, 2, 2, 2, 2, 2, 1];
            modeArray = ['I. Neapolitan major', 'II. Leading whole tone', 'III. Lydian augmented dominant', 'IV. Lydian dominant ♭6', 'V. Major Locrian', 'VI. Half-diminished ♭4 ', 'VII. Altered dominant ♭♭3'];
        }
        if (name === "NEAPOLITAN_MINOR") {
            intervalArray = [1, 2, 2, 2, 1, 3, 1];
            modeArray = ['I. Neapolitan minor', 'II. Lydian ♯6', 'III. Mixolydian augmented', 'IV. Romani minor', 'V. Locrian dominant', 'VI. Ionian ♯2', 'VII. Ultralocrian'];
        }
        if (name === "HUNGARIAN_MAJOR") {
            intervalArray = [3, 1, 2, 1, 2, 1, 2];
            modeArray = ['I. Hungarian major', 'II. Ultralocrian ♭♭6', 'III. Harmonic minor ♭5', 'IV. Altered dominant ♮6', 'V. Jazz minor ♯5', 'VI. Ukrainian Dorian ♭2', 'VII. Lydian augmented ♯3'];
        }
        if (name === "ROMANIAN_MAJOR") {
            intervalArray = [1, 3, 2, 1, 2, 1, 2];
            modeArray = ['I. Romanian major', 'II.Super-Lydian augmented ♮6', 'III. Locrian ♮2 ♭♭7', 'IV. Istrian (heptatonic)', 'V. Jazz minor ♭5', 'VI. Javanese ♭4', 'VII.Lydian augmented ♭3'];
        }
        this.intervalArray = shiftMode(intervalArray, mode);
        this.modeArray = modeArray;
    }
}

function shiftMode(array, mode) {
    let shifted = array.slice(mode);
    if (mode !== 0) {
        shifted.push(...array.slice(0, mode));
    }
    return shifted.slice(0, array.length - 1);
}