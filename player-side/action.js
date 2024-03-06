//the action class, for when the player actually acts
class Action{
    constructor(source, targets, techniques, priority){
        this.source = source;
        this.targets = targets;
        this.techniques = techniques;
        this.priority = priority;
    }

    get from(){
        return this.source;
    }

    get to(){
        return this.targets;
    }

    get techs(){
        return this.techniques;//techniques are event objects with a callback fn that returns an effect object
    }

    get prio(){
        return this.priority;
    }

    occur(){
        let events = [];
        for(const tech of this.techniques){
            events.push(tech.affect());
        }
        return events;
    }

}

class Move extends Action{
    constructor(speed, source,targets,techniques, priority){
        super(source, targets, techniques, priority);
        this.speed = speed;
    }
}

class Skill extends Action{
    constructor(color,source,targets,techniques, priority){
        super(source,targets,techniques, priority);
        this.color = color;
    }
}