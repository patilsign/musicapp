module.exports = (app) => {
    const playlist = require('../controllers/playlist.controller.js');

    app.get('/playlist', playlist.findAll);

    app.get('/playlist/:userId', playlist.findUserPlaylists);

    app.post('/playlist', playlist.create);

    app.put('/playlist', playlist.update);

    //app.put('/playlist/song', playlist.addSongs);

    //app.delete('/playlist/:playlistid/song/:songid', playlist.removeSongs);

    app.delete('/playlist/:playlistId', playlist.delete);
}