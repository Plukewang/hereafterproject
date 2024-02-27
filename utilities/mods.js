
class Mod{
    constructor(target, mod){
        this.target = target;//target stat to affect
        this.mod = mod;//how much to affect
    }

    get modTarget(){
        return this.target;
    }

    get modifier(){
        return this.mod;
    }

    alter(value){
        return this.modifier+value;
    }
}

class Effect{
    constructor(mods, condition){//a condition that is checked on update and a set of modifiers. The condition is a callback fn
        this.condition = condition.bind(this.mods);
        this.mods = mods;
    }

    get modList(){
        return this.mods;
    }

    update(){
        return this.condition();//condition fn gives a list of updated modifiers 
    }
}

export {Mod, Effect};