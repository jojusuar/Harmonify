let divCalculator = document.getElementById('calculatorOutput');
let calculatorButton = document.getElementById('calcButton');
function printEquivalent() {
    let myNote = noteBuilder(noteValue, flat, sharp);
    divCalculator.innerHTML = '<h1>' + myNote.symbol + ', equivalent: ' + myNote.equivalent.symbol + '</h1>';
}
calculatorButton.addEventListener('click', function () {
    printEquivalent();
});