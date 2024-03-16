let calculatorButton = document.getElementById('calcButton');
function printEquivalent() {
    let myNote = noteBuilder(noteValue, flat, sharp);
    divOutput.innerHTML = '<h1>' + myNote.symbol + ', equivalent: ' + myNote.equivalent.symbol + '</h1>';
}
calculatorButton.addEventListener('click', function () {
    printEquivalent();
});