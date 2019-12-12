const Song = require('../models/song.model.js');
const Review = require('../models/review.model.js');
console.log("control - song.controller.js");
var mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_KEY; 
exports.create = (req, res) => {
    // console.log("Auth: " + req.headers.authorization);
    // if (typeof req.headers.authorization === 'undefined')
	// 	return res.status(401).send({"msg":"Access denied. Missing Auth header."});
	// const token = req.headers.authorization.split(" ");
	// if (! token[0].startsWith("Bearer")) {
	// 	return res.status(401).send({"msg":"Access denied. Missing Token."});
	// }
    try {
        // console.log("token-> " + token[1]);
		// const payload = jwt.verify(token[1], secret);
		// console.log("JWT: ", JSON.stringify(payload));
        const song = new Song(req.body);
        Song.findOne({"title" : req.body.title, "artist" : req.body.artist, "album" : req.body.album, "year" : req.body.year, "genre":req.body.genre}).then(data => {
            if(!data) {
                song.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Song."
                    }); 
                });
            } else {
                res.status(200).send({
                    message: "Song already exists"
                });
            }

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Song."
            }); 
        });
	  } catch (ex) {
        //if invalid token
        console.log("invalid token-> " + ex);
		return res.status(401).send({"msg":"Access denied." + ex});
      }


};

exports.findAll = (req, res) => {
    Song.find()
        .then(songs => {
            res.send(songs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving songs."
            });
        });
};

exports.findTopSongs = (req, res) => {
    Review.aggregate(
        [{
            $group:
              {
                _id: "$songId",
                avgRating: { $sum: "$rating" }
              }
          },
          { $sort: { avgRating: -1 } },
          { $limit : 10 }
        ]
    ).then(result => {
        var songIds = [];
        result.forEach(element => {
            songIds.push(mongoose.Types.ObjectId(element._id));
        });
       console.log(songIds);
       var query = [
        {$match: {_id: {$in: songIds}}},
        {$addFields: {"__order": {$indexOfArray: [songIds, "$_id" ]}}},
        {$sort: {"__order": 1}}
       ];
       Song.aggregate(query)
        .then(songs => {
            res.send(songs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving songs."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving songs."
        });
    });
};

exports.findOne = (req, res) => {
    Song.findOne({
        _id: mongoose.Types.ObjectId(req.params.songId)
    }).then(song => {
        res.status(200).send(song);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the song"
        });
    });
};

exports.update = (req, res) => {
    Song.updateOne({
        _id: mongoose.Types.ObjectId(req.body._id)
      }, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the song"
        });
    });
};

// exports.updateVisibility = (req, res) => {
//     Song.updateOne({_id : mongoose.Types.ObjectId(req.params.songId)}, {$set : {"visibility" : req.params.value}})
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while updating the song"
//             });
//         });
// }

exports.delete = (req, res) => {
    Song.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.songId)
    }, function(err, result) {
        if(err) 
          res.status(500).send({
            message: err.message || "Some error occurred while deleting the song"
            });
        else
          res.status(200).send(result);
    });
};