import DoubleLinkNode from "./DoubleLinkNode";
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
        }
        else if (this.reference.getPrevious() === null) {
            this.reference.setNext(new DoubleLinkNode());
            this.reference.next.setNext(this.reference);
            this.reference.next.setPrevious(this.reference);
            this.reference.setPrevious(this.reference.next);
            this.reference.next.setData(content);
        }
        else { //apparently Javascript does let me directly modify attributes of an object stored in a variable lol
            let prev = this.reference.previous;
            let temp = new DoubleLinkNode();
            temp.setData(content);
            temp.setPrevious(prev);
            temp.setNext(this.reference);
            prev.setNext(temp);
            this.reference.setPrevious(temp);
        }
        this.size++;
    }

    addAll(elements) {
        elements.forEach(element => {
            this.add(element);
        });
    }
}