import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var server = '//localhost:3000'

var store = new vuex.Store({
	state: {
		loggedIn: false,
		username: '',
		myTunes: [],
		results: [],
		currentSong: {}
	},
	mutations: {
		setResults(state, results) {
			state.results = results
		},
		setUser(state, payload) {
			console.log(payload)
			state.username = payload.username;
			state.loggedIn = true;
		}
	},
	actions: {
		getMusicByArtist({ commit, dispatch }, artist) {
			var url = '//bcw-getter.herokuapp.com/?url=';
			var url2 = 'https://itunes.apple.com/search?media=music&term=' + artist;
			// var url2 = 'https://api.spotify.com/v1/search?type=track&limit=50&q=' + artist; // & offset=page*50
			var apiUrl = url + encodeURIComponent(url2);
			$.getJSON(apiUrl).then(data => {
				var songList = data.results.map(song => {
					return {
						title: song.trackName,
						albumArt: song.artworkUrl100,
						artist: song.artistName,
						collection: song.collectionName,
						price: song.collectionPrice,
						preview: song.previewUrl,
						link: song.trackViewUrl
					};
				})
				commit('setResults', songList)
			})
			// $.ajax({
			// 	method: 'GET',
			// 	contentType: 'application/json',
			// 	url: apiUrl,
			// 	// Once switched to Server side, should have CORS options access-control-allow-headers 'Authorization' perhaps
			// 	beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + apikey); }, 
			// 	// headers: {
			// 	// 	Authorization: "Bearer " + apikey
			// 	// }
			// })
			// 	.then(data => {
			// 		console.log(data)
			// 	})
			// 	.fail(data => console.error(data))
		},
		getMyTunes({ commit, dispatch }) {
			//this should send a get request to your server to return the list of saved tunes
		},
		addToMyTunes({ commit, dispatch }, track) {
			//this will post to your server adding a new track to your tunes
		},
		removeTrack({ commit, dispatch }, track) {
			//Removes track from the database with delete
		},
		promoteTrack({ commit, dispatch }, track) {
			//this should increase the position / upvotes and downvotes on the track
		},
		demoteTrack({ commit, dispatch }, track) {
			//this should decrease the position / upvotes and downvotes on the track
		},

		// USER ACTIONS
		login({ commit, dispatch }, payload) {
			$.post(server + '/login', payload)
				.then(res => {
					commit('setUser', res.data)
				}).fail(res => {
					console.log(res)
					alert('Invalid email or password')
				})
		},
		register({ commit, dispatch }, payload) {
			$.post(server + '/register', payload)
				.then(res => {
					console.log(res)
					commit('setUser', res.data)
				}).fail(res => {
					console.log(res)
					alert(res.error)
				})
		}

	}
})

export default store
