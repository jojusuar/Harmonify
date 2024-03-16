class Intervals{
    constructor(name){
        this.name = name;
        if(name==="DIATONIC"){
            this.intervalArray=[2,2,1,2,2,2,1];
        }
        if(name==="PENTATONIC"){
            this.intervalArray=[2,2,3,2,3];
        }
        if(name==="MELODIC"){
            this.intervalArray=[2,2,2,2,1,2,1];
        }
    }
}