import { makeAutoObservable } from 'mobx';

class GlobalStates {
    
    username = ''
    setUsername(newUsername) {
        this.username = newUsername
    }

    constructor() {
        makeAutoObservable(this);
    }
}

export default new GlobalStates();