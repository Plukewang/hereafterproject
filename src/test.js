import Player from "../player-side/player.js";
import Stat from "../player-side/stats.js";
import {Mod, Effect} from "../player-side/mods.js";

function createPlayerStats(){
    let playerStat = new Map();

    playerStat.set("PHY", new Stat("PHY", 5, 6, 0));
    playerStat.set("INT", new Stat("INT", 5, 6, 0));
    playerStat.set("INS", new Stat("INS", 5, 6, 0));
    playerStat.set("PRC", new Stat("PRC", 5, 6, 0));
    playerStat.set("AGI", new Stat("AGI", 5, 6, 0));
    playerStat.set("DPT", new Stat("DPT", 5, 6, 0));
    playerStat.set("LVL", new Stat("PHY", 5, 6, 0));

    return playerStat;
}



let PHY = new Stat("PHY", 5, 5, 0);
let INT = new Stat("INT",5, 5, 0);

let stats = new Map();
stats.set("PHY", PHY);
stats.set("INT", INT);

let testMod = new Mod("PHY", -1);

let Test = new Effect([testMod], ()=>{

    let newMod = new Mod("PHY", 1)
    let timer = -1;
    if(timer<0){ return newMod;}
    else if(timer>1){return new Mod("INT", 2)}
    else return testMod;
})

let Joe = new Player("Joe", createPlayerStats(), [Test], [], []);

console.log(Joe.updateStats);


