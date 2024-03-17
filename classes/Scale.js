class Scale {
    constructor(root, intervals, mode) {
        let chromatic = new CircularLinkedList();
        let natural = [noteBuilder("C", false, false), noteBuilder("C", false, true), noteBuilder("D", false, false), noteBuilder("D", false, true), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("F", false, true), noteBuilder("G", false, false), noteBuilder("G", false, true), noteBuilder("A", false, false), noteBuilder("A", false, true), noteBuilder("B", false, false)];
        let altered = [noteBuilder("C", false, false), noteBuilder("C", true, false), noteBuilder("D", false, false), noteBuilder("D", true, false), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("F", true, false), noteBuilder("G", false, false), noteBuilder("G", true, false), noteBuilder("A", false, false), noteBuilder("A", true, false), noteBuilder("B", false, false)];
        if(root.flat || root.sharp){
            chromatic.addAll(altered);
            
        }else{
            chromatic.addAll(natural);
        }
        chromatic.changeReference(chromatic.indexOf(root));
        let indexes = [0];
        intervals.intervalArray.forEach(interval => {
            indexes.push(indexes.slice(-1)[0] + interval);
        });
        let notes = new CircularLinkedList();
        indexes.forEach(index => {
            notes.add(chromatic.get(index));
        });
        notes.changeReference(mode - 1);
        notes.replaceWithEquivalents();
        this.notes = notes;
    }
}