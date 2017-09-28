class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
			throw new Error();
		}
        this.initial = config.initial;
        this.activeState = config.initial;
        this.states = config.states;

        this._undo = [];
        this._redo = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.states[state]) {
            this._redo = [];
            this._undo.unshift(this.activeState);
            this.activeState = state;
        } else {
            throw new Error();
        }
    
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
       if(this.states[this.activeState].transitions[event]) {
           this._redo = [];
           this.changeState(this.states[this.activeState].transitions[event]);
       }
       else {
           throw new Error();
       }
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if(event) {
            for(let state in this.states) {
                if(event in this.states[state].transitions) {
                    states.push(state);
                }
            }
            return states;
        } else {
            for(let state in this.states) {
                states.push(state);
            }
            return states;
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._undo.length) {
            this._redo.unshift(this.activeState);
            this.activeState = this._undo.shift();
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        
        if (this._redo.length) {
            this._undo.unshift(this.activeState);
            this.activeState = this._redo.shift();
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._redo = [];
		this._undo = [];
    }

}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
