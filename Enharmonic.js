let divCalculator = document.getElementById('calculatorOutput');
let noteButtons = document.querySelectorAll('.toggleA-button');
let alterButtons = document.querySelectorAll('.toggleB-button');
let calculatorButton = document.getElementById('calcButton');
let noteValue;
let flat = false;
let sharp = false;
noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        noteButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'white';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'blue';
        noteValue = button.getAttribute('data-value');
    });
});
alterButtons.forEach(button => {
    button.addEventListener('click', () => {
        alterButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'white';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'blue';
        let alterValue = button.getAttribute('data-value');
        if (alterValue === 'FLAT') {
            flat = true;
            sharp = false;
        }
        else if (alterValue === 'SHARP') {
            flat = false;
            sharp = true;
        }
        else {
            flat = false;
            sharp = false;
        }
    });
});
function printEquivalent() {
    let myNote = noteBuilder(noteValue, flat, sharp);
    divCalculator.innerHTML = '<h1>' + myNote.symbol + ', equivalent: ' + myNote.equivalent.symbol + '</h1>';
}
calculatorButton.addEventListener('click', function () {
    printEquivalent();
});