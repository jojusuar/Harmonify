class CircularLinkedList {
    constructor() {
        this.reference = new DoubleLinkNode();
        this.size = 0;
    }

    isEmpty() {
        return this.reference.data === null;
    }

    add(content) {
        if (this.isEmpty()) {
            this.reference.setData(content);
            this.reference.setNext(this.reference);
            this.reference.setPrevious(this.reference);
        } else {
            let temp = new DoubleLinkNode();
            temp.setData(content);
            temp.setNext(this.reference);
            temp.setPrevious(this.reference.previous);
            this.reference.previous.setNext(temp);
            this.reference.setPrevious(temp);
        }
        this.size++;
    }

    addAll(elements) {
        elements.forEach(element => {
            this.add(element);
        });
    }

    get(index) {
        let temp = this.reference;
        for (let i = 0; i < index; i++) {
            temp = temp.getNext();
        }
        return temp.getData();
    }

    getNode(index) {
        let temp = this.reference;
        for (let i = 0; i < index; i++) {
            temp = temp.getNext();
        }
        return temp;
    }

    changeReference(index) {
        this.reference = this.getNode(index);
    }

    toString() {
        let string = "";
        let start = this.reference;
        string += start.getData().toString();
        start = start.getNext();
        while (start !== this.reference) {
            if(start.getData() === null){
                string += " - null";
            }
            else{
                string += " - " + start.getData().toString();
            }
            start = start.getNext();
        }
        return string;
    }

    indexOfObject(element) {
        let index = 0;
        let temp = this.reference;
        if (temp.getData().equals(element)) {
            return index;
        }
        temp = this.reference.getNext();
        index++;
        while (temp !== this.reference) {
            if (temp.getData().equals(element)) {
                return index;
            }
            temp = temp.getNext();
            index++;
        }
        return -1;
    }

    indexOfString(element) {
        let index = 0;
        let temp = this.reference;
        if (temp.getData().localeCompare(element)) {
            return index;
        }
        temp = this.reference.getNext();
        index++;
        while (temp !== this.reference) {
            if (temp.getData().localeCompare(element)) {
                return index;
            }
            temp = temp.getNext();
            index++;
        }
        return -1;
    }

    replace(target, element) {
        let temp = this.reference;
        if (temp.getData().equals(target)) {
            temp.setData(element);
            return;
        }
        temp = this.reference.getNext();
        while (temp !== this.reference) {
            if (temp.getData().equals(target)) {
                temp.setData(element);
                return;
            }
            temp = temp.getNext();
        }
    }

    replaceWithEquivalents(pentatonic) {
        divOutput.innerHTML = this.toString();
        let rule = ["C", "D", "E", "F", "G", "A", "B"];
        let start = this.reference;
        let adjacent = start.getNext();
        for (let i = 0; i <= this.size; i++) {
            let startSymbol = start.getData().symbol;
            let adjacentSymbol = adjacent.getData().symbol;
            let diff = rule.indexOf(adjacentSymbol) - rule.indexOf(startSymbol);
            if (diff === 0) {
                adjacent.setData(adjacent.getData().equivalent);
            }
            else if (diff > 1 || diff === -5) {
                if ((adjacentSymbol === "C" || adjacentSymbol === "F") && !pentatonic) {
                    adjacent.setData(adjacent.getData().equivalent);
                }
                else {
                    return true;
                }
            }
            if(startSymbol === "N/A"){
                return true;
            }
            start = start.getNext();
            adjacent = adjacent.getNext();
        }
        return false;
    }
}