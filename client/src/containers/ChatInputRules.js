
export class ChatInputRules {

    constructor(){
        this.rules = {};
    }

    addRule(ruleName, func){
        this.rules[ruleName] = func;
        return this;
    }

    run(params){
        this.params = params;
        return this;
    }

    when(ruleName){
        this.checkedRule = this.rules[ruleName](this.params);
        return this;
    }

    or(ruleName){
        this.checkedRule = this.checkedRule || this.rules[ruleName](this.params);
        return this;
    }

    require(ruleName){
        this.checkedRule = this.rules[ruleName](this.params) && this.checkedRule;
        return this;
    }

    then(command){
        if(this.checkedRule){
            command.execute();
            this.checkedRule = false;
        }
    }
}

export function ChatInputRulesCommand (func, params) {
    this.execute = () => func(params);
}
