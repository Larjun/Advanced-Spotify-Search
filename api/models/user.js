var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    userId: string,
    createdPlaylist: [{
        playlistId: string
    }],
    likedTracks: [{
        trackId: string
    }]

});

module.exports = mongoose.model("User", userSchema);