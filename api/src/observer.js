//https://blog.bitsrc.io/the-observer-pattern-in-javascript-the-key-to-a-reactive-behavior-f28236e50e10
class Observer {

    update(evnt) {
        if (evnt.evntName == "newPlaylist"){
            console.log("New playlist: " + evnt.value);
        }
        if (evnt.evntName == "New User"){
            console.log("New user: " + evnt.value);
        }
        if (evnt.evntName == "Returning User"){
            console.log("Returning User: " + evnt.value);
        }

    }

}


module.exports = Observer;