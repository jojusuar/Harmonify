let allAvailableTensions = false;

function printHarmonicCircle() {
    closePopup();
    let scaleBtn = document.getElementById("scaleButton");
    let scaleCB = document.getElementById("scaleSelector");
    let modeCB = document.getElementById("modeSelector");
    let choiceIndex = scaleCB.selectedIndex;
    let choice = scaleCB[choiceIndex];
    let modeIndex = modeCB.selectedIndex;
    let modeChoice = modeCB[modeIndex];
    let myScale = new Scale(noteBuilder(noteValue, flat, sharp), new Intervals(choice.value, parseInt(modeChoice.value)), pentatonicFlag);
    let myHarmonicCircle = new HarmonicCircle(myScale, allAvailableTensions);
    let currentChord = myHarmonicCircle.chords.reference;
    let formattedComponents = formatComponents(currentChord.getData());
    let htmlCode = '<button onclick="openPopup(\'' + formattedComponents + '\')"><h1>' + currentChord.getData().toString() + '</h1></button>';
    currentChord = currentChord.getNext();
    while (currentChord !== myHarmonicCircle.chords.reference) {
        formattedComponents = formatComponents(currentChord.getData());
        htmlCode += '<button onclick="openPopup(\'' + formattedComponents + '\')"><h1>' + currentChord.getData().toString() + '</h1></button>';
        currentChord = currentChord.getNext();
    }
    divOutput.innerHTML = htmlCode;
}

function formatComponents(chord) {
    string = ' <h2>' + chord.toString() + ' components: <ul>';
    chord.components.forEach(note => {
        string += '<li>' + note.toString() + '</li>';
    });
    string += '</ul></h2>';
    return string;
}

function openPopup(string) {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
    popup.innerHTML = string;
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function toggleTensions(){
    allAvailableTensions = !allAvailableTensions;
    printHarmonicCircle();
}