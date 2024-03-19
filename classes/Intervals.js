class Intervals{
    constructor(name, mode){
        this.name = name;
        let intervalArray;
        let pentatonicSpecialCase = false;
        if(name==="DIATONIC"){
            intervalArray=[2,2,1,2,2,2,1];
        }
        if(name==="PENTATONIC"){
            intervalArray=[2,2,3,2,3];
            pentatonicSpecialCase = true;
        }
        if(name==="HARMONIC"){
            intervalArray=[2,2,1,3,1,2,1];
        }
        if(name==="MELODIC_ASC"){
            intervalArray=[2,2,2,2,1,2,1];
        }
        if(name==="MELODIC_DESC"){
            intervalArray=[2,2,1,2,2,2,1];
        }
        this.intervalArray = shiftMode(intervalArray, mode, pentatonicSpecialCase);
    }
}

function shiftMode(array, mode, special){
    let shifted = [];
    shifted.push(...array.slice(mode));
    if(mode !== 0){
        shifted.push(...array.slice(0, mode));
    }
    if(special){
        return shifted.slice(0,4);
    }
    return shifted.slice(0,6);
}