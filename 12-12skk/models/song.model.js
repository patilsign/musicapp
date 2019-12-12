const mongoose = require('mongoose');
console.log("control - song.model.js");
var Schema = mongoose.Schema;

const SongSchema = new Schema({
    head: String,
    title: String,
    artist: String,
    album: String,
    year: String,
    comment: String,
    'zero-byte': String,
    track: Number,
    genre: String,
    description: String,
    createdByUser: String,
	picture: String,
    visibility: Boolean

}, {
    timestamps: true,
    collection: 'song' 
});

module.exports = mongoose.model('song', SongSchema);