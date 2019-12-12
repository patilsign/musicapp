module.exports = (app) => {
    console.log("control got into song.routes.js");
    const song = require('../controllers/song.controller.js');

    app.post('/song', song.create);

    app.get('/song', song.findAll);

    app.get('/song/toplist', song.findTopSongs);

    app.get('/song/:songId', song.findOne);

    app.put('/song', song.update);

    app.delete('/song/:songId', song.delete);
}