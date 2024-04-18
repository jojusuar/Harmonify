class Scale {
    constructor(root, intervals) {
        if (root == undefined) {
            this.notes = null;
        }
        else {
            let notes = [root];
            for (let interval of intervals.intervalArray) {
                notes.push(getNext(notes[notes.length - 1], interval));
            }
            this.notes = notes;
        }
    }

    toString() {
        let string = this.notes[0].toString();
        for (let i = 1; i < this.notes.length; i++) {
            string += ' - ' + this.notes[i].toString();
        }
        return string;
    }
}