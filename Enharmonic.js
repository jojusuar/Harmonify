let calculatorButton = document.getElementById('calcButton');
function printEquivalent() {
    let myNote = noteBuilder(noteValue, flat, sharp);
    divOutput.innerHTML = '<h1>' + myNote.toString() + ', equivalent: ' + myNote.equivalent.toString() + '</h1>';
}
calculatorButton.addEventListener('click', function () {
    printEquivalent();
});