class Subject {

    constructor() {
        this.observers = [];

    }

    addObserver(obs) {
        this.observers.push(obs);
    }

    notifyObservers(event) {
        this.observers.forEach( o => o.update(event));
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Subject();
        }
    }
  
    getInstance() {
        return Singleton.instance;
    }
  
  }
  
  module.exports = Singleton;