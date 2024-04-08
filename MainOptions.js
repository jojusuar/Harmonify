let optionButtons = document.querySelectorAll('.option-button');
optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        optionButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'rgb(39, 40, 41)';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'rgb(70, 70, 70)';
    });
});
let defaultNote = document.getElementById("CButton");
defaultNote.style.backgroundColor = 'rgb(70, 70, 70)';
let defaultAlter = document.getElementById("naturalButton");
defaultAlter.style.backgroundColor = 'rgb(70, 70, 70)';
let defaultToggle = document.getElementById("ScaleButtons");
let defaultOpt = document.getElementById("scaleOption");
defaultOpt.style.backgroundColor = 'rgb(70, 70, 70)';
defaultToggle.style.display = "block";
let noteButtons = document.querySelectorAll('.toggleA-button');
let alterButtons = document.querySelectorAll('.toggleB-button');
let noteValue = "C";
let flat = false;
let sharp = false;
noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        noteButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'rgb(39, 40, 41)';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'rgb(70, 70, 70)';
        noteValue = button.getAttribute('data-value');
    });
});
alterButtons.forEach(button => {
    button.addEventListener('click', () => {
        alterButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.style.backgroundColor = 'rgb(39, 40, 41)';
        });
        button.classList.add('selected');
        button.style.backgroundColor = 'rgb(70, 70, 70)';
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

let scaleDiv = document.getElementById("ScaleButtons");
let scaleDropdowns = '<select id="scaleSelector" class="dropdown" onchange="handleScale()"><option value="DIATONIC" selected>Diatonic (natural)</option><option value="PENTATONIC">Pentatonic</option><option value="HARMONIC">Harmonic</option><option value="MELODIC_ASC">Melodic (ascending)</option><option value="MELODIC_DESC">Melodic (descending)</option></select><select id="modeSelector" class="dropdown"><option value=0 selected>I. Ionian (major)</option><option value=1>II. Dorian</option><option value=2>III. Phrygian</option><option value=3>IV. Lydian</option><option value=4>V. Mixolydian</option><option value=5>VI. Aeolian (minor)</option><option value=6>VII. Locrian</option></select>';
let scaleDropdownsForHarmonicCircle = '<select id="scaleSelector" class="dropdown" onchange="handleScale()"><option value="DIATONIC" selected>Diatonic (natural)</option><option value="HARMONIC">Harmonic</option><option value="MELODIC_ASC">Melodic (ascending)</option><option value="MELODIC_DESC">Melodic (descending)</option></select><select id="modeSelector" class="dropdown"><option value=0 selected>I. Ionian (major)</option><option value=1>II. Dorian</option><option value=2>III. Phrygian</option><option value=3>IV. Lydian</option><option value=4>V. Mixolydian</option><option value=5>VI. Aeolian (minor)</option><option value=6>VII. Locrian</option></select>';

let divOutput = document.getElementById("output");

function clearOutput() {
    while (divOutput.firstChild) {
        divOutput.removeChild(divOutput.firstChild);
    }
};

function toggleElements(buttonID, divID) {
    let allDivs = document.querySelectorAll('.hidden');
    allDivs.forEach(div => {
        div.style.display = 'none';
    });
    allAvailableTensions = false;
    selectedNotes = [];
    selectedNotesString = "<h2> Notes: </h2>";
    clearOutput();
    closePopup();
    let selected = document.getElementById(divID);
    selected.style.display = 'block';
    if (buttonID === 'scaleOption') {
        scaleDiv.innerHTML = scaleDropdowns + '<br> Select a root note, a scale and a greek mode from above, then hit the build button to generate the scale <br> <button type="button" id="scaleButton" class="output-button" onclick="printScale()">Build scale</button>';
    }
    else if (buttonID === 'harmonicCircleOption') {
        scaleDiv.innerHTML = scaleDropdownsForHarmonicCircle + '<br> Select a tonic chord, a scale and a greek mode from above, then hit the build button to generate the harmonic circle <br> <button type="button" id="harmonicCircleButton" class="output-button" onclick="printHarmonicCircle()">Build harmonic circle</button> <br> Click on any chord to reveal its components <br> Show all available tensions <label class="switch"><input type="checkbox" onclick="toggleTensions()"><span class="slider round"></span></label>';
    }
};