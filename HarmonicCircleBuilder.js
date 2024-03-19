function printHarmonicCircle() {
    let scaleBtn = document.getElementById("scaleButton");
    let scaleCB = document.getElementById("scaleSelector");
    let modeCB = document.getElementById("modeSelector");
    let choiceIndex = scaleCB.selectedIndex;
    let choice = scaleCB[choiceIndex];
    let modeIndex = modeCB.selectedIndex;
    let modeChoice = modeCB[modeIndex];
    let myScale = new Scale(noteBuilder(noteValue, flat, sharp), new Intervals(choice.value, parseInt(modeChoice.value)), pentatonicFlag);
    let string = "";
    divOutput.innerHTML = '<h1> *still cooking* </h1>';
}