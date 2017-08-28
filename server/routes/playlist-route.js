var express = require('express')
var router = express.Router()
var playlists = require('../models/playlist')
var songs = require('../models/song')

router
    // Get all user playlists
    .get('/', (req, res, next) => {
        playlists.find({ userId: req.session.uid })
            .then(playlists => {
                res.send(playlists)
            }).catch(next)
    })
    // Get all songs in a playlist
    .get('/:playlistId/songs', (req, res, next) => {
        songs.find(song => song.playlists[req.params.playlistId])
            .then(songs => {
                res.send(songs);
            }).catch(next);
    })
    // Create playlist
    .post('/', (req, res, next) => {
        req.body.userId = req.session.uid;
        playlists.create(req.body)
            .then(playlist => {
                res.send(playlist)
            }).catch(next)
    })
    // Add song to playlist
    .post('/:playlistId/songs', (req, res, next) => {
        songs.find({ trackId: req.body.trackId })
            .then(song => {
                songs.create(req.body)
                    .then(song => {
                        song.users[req.session.uid] = req.session.uid;
                        song.playlists[req.params.playlistId] = req.params.playlistId;
                        song.save();
                        res.send(song);
                    }).catch(next)
            }).catch(() => {
                songs.create(req.body)
                    .then(song => {
                        song.users[req.session.uid] = req.session.uid;
                        song.playlists[req.params.playlistId] = req.params.playlistId;
                        song.save();
                        res.send(song)
                    }).catch(next)
            })
    })
    // Delete playlist
    .delete('/:playlistId', (req, res, next) => {
        // TODO: Must first remove all songs from playlist
        playlists.findById(req.params.playlistId)
            .then(playlist => {
                if (req.session.uid.toString() == playlist.userId.toString()) {
                    playlist.remove()
                    res.send({ message: 'Successfully Removed' })
                } else {
                    res.send({ message: 'You are not authorized to remove this playlist' })
                }
            }).catch(next)
    })
    // Remove song from playlist
    // TODO: What to do if they remove it from all?
    .delete('/:playlistId/songs/:songId', (req, res, next) => {
        songs.findById(req.params.id)
            .then(song => {
                if (req.session.uid.toString() == song.userId.toString()) {
                    song.remove()
                    res.send({ message: 'Successfully Removed' })
                } else {
                    res.send({ message: 'You are not authorized to remove this song' })
                }
            }).catch(next)
    })


// ERROR HANDLER
router.use('/', (err, req, res, next) => {
    if (err) {
        res.send(418, {
            success: false,
            error: err.message
        })
    } else {
        res.send(400, {
            success: false,
            error: 'Something failed please try again later'
        })
    }
})

module.exports = router
