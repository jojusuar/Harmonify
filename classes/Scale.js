class Scale {
    constructor(root, intervals, pentatonic) {
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
        if (notes.replaceWithEquivalents(pentatonic)) {
            chromatic = new CircularLinkedList();
            let corrector = null;
            if (root.equals(noteBuilder("B", false, false)) || root.equals(noteBuilder("C", true, false))) { //the hackiest, most unintelligent fix ever for a very probable logic issue above
                corrector = noteBuilder("C", true, false);
                chromatic.add(corrector);
            }
            chromatic.addAll(altered);
            if (root.symbol === "C" && corrector !== null) {
                rootIndex = chromatic.indexOfObject(root);
            }
            else {
                rootIndex = chromatic.indexOfObject(root.equivalent);
            }
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
            if (notes.replaceWithEquivalents(pentatonic) && !pentatonic && (root.equals(noteBuilder("C", false, false)) || root.equals(noteBuilder("B", false, true)) || root.equals(noteBuilder("F", false, false)) || root.equals(noteBuilder("E", false, true)))) { // in case a scale has fuck you intervals. I hate this so much
                chromatic = new CircularLinkedList();
                corrector = null;
                chromatic.addAll(natural);
                if(root.equals(noteBuilder("C", false, false)) || root.equals(noteBuilder("B", false, true))){
                    corrector = noteBuilder("B", false, true);
                }
                if(root.equals(noteBuilder("F", false, false)) || root.equals(noteBuilder("E", false, true))){
                    corrector = noteBuilder("E", false, true);
                }
                rootIndex = chromatic.indexOfObject(root);
                if (rootIndex < 0) {
                    rootIndex = chromatic.indexOfObject(root.equivalent);
                }
                chromatic.changeReference(rootIndex);
                chromatic.reference.setData(corrector);
                indexes = [0];
                intervals.intervalArray.forEach(interval => {
                    indexes.push(indexes.slice(-1)[0] + interval);
                });
                notes = new CircularLinkedList();
                indexes.forEach(index => {
                    notes.add(chromatic.get(index));
                });
                notes.replaceWithEquivalents(pentatonic)
            }
        }
        this.notes = notes;
    }
}