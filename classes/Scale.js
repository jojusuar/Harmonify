class Scale {
    constructor(root, intervals) {
        let chromatic = new CircularLinkedList();
        let natural = [noteBuilder("C", false, false), noteBuilder("C", false, true), noteBuilder("D", false, false), noteBuilder("D", false, true), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("F", false, true), noteBuilder("G", false, false), noteBuilder("G", false, true), noteBuilder("A", false, false), noteBuilder("A", false, true), noteBuilder("B", false, false)];
        let altered = [noteBuilder("C", false, false), noteBuilder("D", true, false), noteBuilder("D", false, false), noteBuilder("E", true, false), noteBuilder("E", false, false), noteBuilder("F", false, false), noteBuilder("G", true, false), noteBuilder("G", false, false), noteBuilder("A", true, false), noteBuilder("A", false, false), noteBuilder("B", true, false), noteBuilder("B", false, false)];
        chromatic.addAll(natural);
        let rootIndex = chromatic.indexOfObject(root);
        if (rootIndex < 0) {
            rootIndex = chromatic.indexOfObject(root.equivalent);
        }
        chromatic.changeReference(rootIndex);
        let indexes = [0];
        intervals.intervalArray.forEach(interval => {
            indexes.push(indexes.slice(-1)[0] + interval);
        });
        let notes = new CircularLinkedList();
        indexes.forEach(index => {
            notes.add(chromatic.get(index));
        });
        if (notes.replaceWithEquivalents()) {
            chromatic = new CircularLinkedList();
            chromatic.addAll(altered);
            rootIndex = chromatic.indexOfObject(root.equivalent);
            if (rootIndex < 0) {
                rootIndex = chromatic.indexOfObject(root);
            }
            chromatic.changeReference(rootIndex);
            indexes = [0];
            intervals.intervalArray.forEach(interval => {
                indexes.push(indexes.slice(-1)[0] + interval);
            });
            notes = new CircularLinkedList();
            indexes.forEach(index => {
                notes.add(chromatic.get(index));
            });
            notes.replaceWithEquivalents();
        }
        this.notes = notes;
    }
}