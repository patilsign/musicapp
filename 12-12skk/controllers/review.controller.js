const Review = require('../models/review.model.js');

exports.findBySongId = (req, res) => {
    Review.find({"songId" : req.params.songId}).sort({createdAt : -1})
    .then(reviews => {
        res.send(reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews"
        });
    });
};

exports.create = (req, res) => {
    const review = new Review(req.body);
    review.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
