let optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        optionButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'white';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'yellow';
    });
});
let enharmonicToggle = document.getElementById("EnharmonicButtons");
let enharmonicOpt = document.getElementById("enharmonicOption");
enharmonicOpt.style.backgroundColor = 'yellow';
enharmonicToggle.style.display = "block";
let noteButtons = document.querySelectorAll('.toggleA-button');
let alterButtons = document.querySelectorAll('.toggleB-button');
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

let divOutput = document.getElementById("output");

function clearOutput() {
    while (divOutput.firstChild) {
        divOutput.removeChild(divOutput.firstChild);
    }
};

function toggleElements(divID) {
    let allDivs = document.querySelectorAll('.hidden');
    allDivs.forEach(div => {
        div.style.display = 'none';
    });
    clearOutput();
    let selected = document.getElementById(divID);
    selected.style.display = 'block';
};