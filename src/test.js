import Player from "../utilities/player.js";
import Stat from "../utilities/stats.js";
import {Mod, Effect} from "../utilities/mods.js";




let PHY = new Stat("PHY", 5, 5, 0);
let INT = new Stat("INT",5, 5, 0);

let stats = new Map();
stats.set("PHY", PHY);
stats.set("INT", INT);

let testMod = new Mod("PHY", -1);

let Test = new Effect(testMod, ()=>{

    let newMod = new Mod("PHY", 1)
    let timer = 0;
    if(timer>0) return newMod;
    else return testMod;
})

let Joe = new Player("Joe", stats, [Test], [], []);


