var express = require('express')
var router = express.Router()
var songs = require('../models/song')

router
	// Add song to user's mytunes
	.post('/', (req, res, next) => {
		req.body.userId = req.session.uid;
		songs.create(req.body)
			.then(song => {
				song.created = Math.floor(Date.now() / 1000);
				res.send(song)
			}).catch(next)
	})
	// Add song to specific playlist
	.post('/:playlistId', (req, res, next) => {
		
	})
	// .put('/:id/vote', (req, res, next) => {
	// 	let userVote = req.body.vote;
	// 	let userId = req.session.uid;
	// 	songs.findById(req.params.id)
	// 		.then(song => {
	// 			updateUserVote(song, userVote, userId)
	// 			song.save((err, todo) => {
	// 				res.send(song);
	// 			});
	// 		}).catch(next)
	// })
	.delete('/:id', (req, res, next) => {
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
