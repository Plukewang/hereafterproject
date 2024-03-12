/*player object */
import * as Mod from "./mods.js";
import Stat from "./stats.js";

class Player{
    constructor(name, stats, effects, traits, inventory){
        
        this.name = name;
        this.stats = stats;
        this.effects = effects;
        this.traits = traits;
        this.inventory= inventory;
    }
    get getStats(){
        return this.stats;
    }

    get updateStats(){
        //iterates through all effects to update player state
        let update = [];
        for(var effect of this.effects){
            update.push(effect.update());  //count down on all the effects that need to be updated and/or removed
        }
        for(var mod of update){//goes through list of updated modifiers and applies them to the bonuses 
            this.stats.get(mod.modTarget).bonuses+=mod.modifier;
        }

        return [this.stats, update]
    }

    SetStat(statName, val){
        this.stats['StatName'].set(val);
    }

    playerSkill(color, source, targets, techniques, priority){
        let skill = new Skill(color, source, targets, techniques, priority);//TODO: action class
        //retrieve an available skill or construct a new one
        
        return skill;
    }

    playerMove(speed, source, targets, techniques, priority){
        let move = new Move(speed, source, targets, techniques, priority);//TODO: action class
        //retrieve an available movement or construct a new one
        
        return move;
    }

    playerEffect(effects){
        //makes a player take an effect
        this.effects.push(effects);
    }
    
    playerStatCheck(stat){//stat is a 3-char full cap string denoting the stat
        return this.stats[`${stat}`].statCheck;
    }


}

function createPlayerStats(){
    let playerStat = new Map();

    playerStat.set("PHY", new Stat("PHY", 5, 6, 0));
    playerStat.set("INT", new Stat("INT", 5, 6, 0));
    playerStat.set("INS", new Stat("INS", 5, 6, 0));
    playerStat.set("PRC", new Stat("PRC", 5, 6, 0));
    playerStat.set("AGI", new Stat("AGI", 5, 6, 0));
    playerStat.set("DPT", new Stat("DPT", 5, 6, 0));
    playerStat.set("LVL", new Stat("PHY", 5, 6, 0));

    return Object.fromEntries(playerStat.entries());
}
export default Player;
export {createPlayerStats};