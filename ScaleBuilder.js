import Scale from "./classes/Scale";
let scaleBtn = document.getElementById("scaleButton");
function printScale() {
    let myScale = new Scale(noteValue, "DIATONIC", 1);
    let string = "xddd";
    divOutput.innerHTML = string;
}

scaleBtn.addEventListener('click', function () {
    printScale();
});