/*player object */
import * as Mod from "./mods.js";
import * as Stat from "./stats.js";

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

            this.stats.get(mod.modTarget).bonuses+mod.modifier;
        }

        return [this.stats, update]
    }

    playerSkill(){
        let skill = new Skill();//TODO: action class
        //retrieve an available skill or construct a new one
        
        return skill
    }

    playerMove(){
        let move = new Move();//TODO: action class
        //retrieve an available movement or construct a new one
        
        return move
    }

    playerEffect(effect){
        //makes a player take an effect
        this.effects.push(effect);
    }
    



}
export default Player;