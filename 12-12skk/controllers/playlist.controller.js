const Playlist = require('../models/playlist.model.js');
var mongoose = require('mongoose');

exports.findAll = (req, res) => {
    Playlist.find()
    .then(playlist => {
        res.send(playlist);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists"
        });
    });
};

exports.findUserPlaylists = (req, res) => {
    Playlist.find({"userId" : req.params.userId,"visibility" : "public"})
    .then(playlist => {
        res.send(playlist);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists"
        });
    });
}

exports.create = (req, res) => {
    const playlist = new Playlist(req.body);
    playlist.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the playlist"
        });
    });
};

exports.update = (req, res) => {
    var updateObj = {};
    if(req.body.title) {
        updateObj.title = req.body.title;
    }
    if(req.body.description) {
        updateObj.description = req.body.description;
    }
    if(req.body.visibility) {
        updateObj.visibility = req.body.visibility;
    }
    Playlist.updateOne({_id : mongoose.Types.ObjectId(req.body._id)}, {$set : updateObj})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the playlist"
        });
    });
};

// exports.addSongs = (req, res) => {
//     Playlist.findOne({_id : mongoose.Types.ObjectId(req.body._id)})
//     .then(playlist => {
//         var updatedSongs;
//         if(playlist.songs) {
//             updatedSongs = playlist.songs.concat(req.body.songs);
//         } else {
//             updatedSongs = req.body.songs;
//         }
//         console.log("updated " + updatedSongs);
//         Playlist.updateOne({_id : mongoose.Types.ObjectId(req.body._id)}, {$set : {"songs" : updatedSongs}})
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the playlist"
//             });
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving playlists"
//         });
//     });
// }

// exports.removeSongs = (req, res) => {
//     Playlist.findOne({_id : mongoose.Types.ObjectId(req.params.playlistid)})
//     .then(playlist => {
//         var updatedSongs;
//         var currentSongs = playlist.songs;
//         if(currentSongs) {
//             updatedSongs = currentSongs.filter(item => item != req.params.songid);
//         } else {
//             return;
//         }
//         console.log("updated " + updatedSongs);
//         Playlist.updateOne({_id : mongoose.Types.ObjectId(req.params.playlistid)}, {$set : {"songs" : updatedSongs}})
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the playlist"
//             });
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving playlists"
//         });
//     });
// };

exports.delete = (req, res) => {
    Playlist.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.playlistId)
    }, function(err, result) {
        if(err) 
          res.status(500).send({
            message: err.message || "Some error occurred while deleting the playlist"
            });
        else
          res.status(200).send(result);
    });
};