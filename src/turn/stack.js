/* Class stack takes a simultaneous phase of a turn and resolves the actions in order of the action's priority. */
class Stack{
    constructor(entities, acts){
        this.entities = entities;
        this.acts = acts;        //events is an array of actions events that each have a callback fn ordered by event.prio
        this.stack = [];
        this.tempos = Array(entities.length).fill(0);
    }   

    get actions(){
        return this.acts;
    }

    get requests(){
        return this.stack;
    }
    process(outs, advs){//makes a DM ruling on the final effects and the tempo advantage at the end of the turn
        for(const out of outs){
            this.stack.push(out);
        }
        for(var adv of advs){//changes advantage 
            tempo += adv;
        }
    }

    resolve(){
        for(var out of this.stack){
            for(const target of out.to){
                target.playerEffect(out.occur()); //makes the effects returned by occur() happen to the chosen target
            }
        }
    }

    
}//TODO: add functionality to get a ruling and create a new effect