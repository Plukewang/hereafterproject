/* class for the rolling and the modification of stats. */

class Stat{

    constructor(name, base, roll, bonuses){
        this.name = name;
        this.base = base;
        this.roll = roll;
        this.bonuses = bonuses;
   
    }

    get statCheck(){
        let out = this.base+this.bonuses;
        out += Math.floor(Math.random()*this.roll);
        return out;
    }


};

export default Stat;