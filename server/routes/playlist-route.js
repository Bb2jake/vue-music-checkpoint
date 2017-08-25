var express = require('express')
var router = express.Router()
var playlists = require('../models/playlist')

router
	// Get all user playlists
	.get('/', (req, res, next) => {
		playlists.find({ userId: req.session.uid })
			.then(playlists => {
				res.send(playlists)
			}).catch(next)
	})
	// Create playlist
	.post('/', (req, res, next) => {
		req.body.userId = req.session.uid;
		playlists.create(req.body)
			.then(playlist => {
				playlist.created = Math.floor(Date.now() / 1000);
				res.send(playlist)
			}).catch(next)
	})
	// .put('/:id/vote', (req, res, next) => {
	// 	let userVote = req.body.vote;
	// 	let userId = req.session.uid; // shouldn't this be req.session so it's not spoofable?
	// 	playlists.findById(req.params.id)
	// 		.then(playlist => {
	// 			updateUserVote(playlist, userVote, userId)
	// 			playlist.save((err, todo) => {
	// 				res.send(playlist);
	// 			});
	// 		}).catch(next)
	// })
	.delete('/:id', (req, res, next) => {
		playlists.findById(req.params.id)
			.then(playlist => {
				if (req.session.uid.toString() == playlist.userId.toString()) {
					playlist.remove()
					res.send({ message: 'Successfully Removed' })
				} else {
					res.send({ message: 'You are not authorized to remove this playlist' })
				}
			}).catch(next)

		// Below code to empty out database of playlists. DO NOT USE UNLESS YOU KNOW WHAT YOU'RE DOING
		// playlists.find({}).then(playlists => {
		// 	playlists.forEach(playlist => playlist.remove())
		// })
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
