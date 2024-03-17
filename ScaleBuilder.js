let scaleBtn = document.getElementById("scaleButton");
function printScale() {
    let myScale = new Scale(noteBuilder(noteValue, flat, sharp), new Intervals("DIATONIC"), 1);
    let string = "";
    divOutput.innerHTML = '<h1>'+myScale.notes.toString()+'</h1>';
}
scaleBtn.addEventListener('click', function () {
    printScale();
});