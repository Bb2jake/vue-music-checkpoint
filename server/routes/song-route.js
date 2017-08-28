var express = require('express')
var router = express.Router()
var songs = require('../models/song')

router
    // Get all songs for a user
    .get('/', (req, res, next) => {
        songs.find(song => song.users[req.session.uid])
            .then(songs => {
                res.send(songs)
            }).catch(next)
    })
    // Add song to user's mytunes
    // TODO: Check if song exists, then create, else update
    .post('/', (req, res, next) => {
        req.body.userId = req.session.uid;
        songs.create(req.body)
            .then(song => {
                res.send(song)
            }).catch(next)
    })
    // Removes from mytunes...
    // TODO: Should also remove from all playlists?
    .delete('/:id', (req, res, next) => {
        songs.findById(req.params.id)
            .then(song => {
                let uid = req.session.uid.toString();
                if (song.users[uid]) {
                    delete song.users[uid];
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
