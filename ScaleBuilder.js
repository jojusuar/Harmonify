let pentatonicFlag = false;

function handleScale() {
    let scaleBtn = document.getElementById("scaleButton");
    let scaleCB = document.getElementById("scaleSelector");
    let modeCB = document.getElementById("modeSelector");
    let choiceIndex = scaleCB.selectedIndex;
    let choice = scaleCB[choiceIndex];
    if (choice.value === "PENTATONIC") {
        modeCB.innerHTML = "<option value=0>Major</option> <option value=1>2nd position</option> <option value=2>3rd position</option> <option value=3>4th position</option> <option value=4>Minor</option>";
        pentatonicFlag = true;
    } else {
        modeCB.innerHTML = "<option value=0>I. Ionian (major)</option> <option value=1>II. Dorian</option> <option value=2>III. Phrygian</option> <option value=3>IV. Lydian</option> <option value=4>V. Mixolydian</option> <option value=5>VI. Aeolian (minor)</option> <option value=6>VII. Locrian</option>";
        pentatonicFlag = false;
    }
}

function printScale() {
    let scaleBtn = document.getElementById("scaleButton");
    let scaleCB = document.getElementById("scaleSelector");
    let modeCB = document.getElementById("modeSelector");
    let choiceIndex = scaleCB.selectedIndex;
    let choice = scaleCB[choiceIndex];
    let modeIndex = modeCB.selectedIndex;
    let modeChoice = modeCB[modeIndex];
    let myScale = new Scale(noteBuilder(noteValue, flat, sharp), new Intervals(choice.value, parseInt(modeChoice.value)), pentatonicFlag);
    let string = "";
    divOutput.innerHTML = '<h1>' + myScale.notes.toString() + '</h1>';
}