import CircularLinkedList from "../adt/CircularLinkedList"
export default class Scale {
    constructor(root, intervals, mode) {
        let chromatic = new CircularLinkedList();
        let order = [["C", false, false], ["C", false, true], ["D", false, false], ["D", false, true], ["E", false, false], ["F", false, false], ["F", false, true], ["G", false, false], ["G", false, true], ["A", false, false], ["A", false, true], ["B", false, false]];
        chromatic.addAll(order);
        let indexes = [0];
        intervals.intervalArray.forEach(interval => {
            indexes.push(indexes.slice(-1)[0] + interval);
        });
        let notes = [];
        indexes.forEach(index => {
            let data = chromatic.get(index);
            let note = noteBuilder(data[0], data[1], data[2]);
            notes.push(note);
        });
        this.notes = notes;
    }
}