import vue from 'vue'
import vuex from 'vuex'
import $ from 'jquery'

vue.use(vuex)

var server = '//localhost:3000'

$.ajaxSetup({
	crossDomain: true,
	xhrFields: {
		withCredentials: true
	}
})

var store = new vuex.Store({
	state: {
		loggedIn: false,
		username: '',
		myTunes: [],
		results: [],
		currentSong: {},
		gettingMusic: false,
		playlists: {}
	},
	mutations: {
		setResults(state, results) {
			state.results = results
		},
		setUser(state, payload) {
			state.username = payload.username;
			state.loggedIn = payload.loggedIn;
		},
		setGettingMusic(state, payload) {
			state.gettingMusic = payload;
		},
		setMyTunes(state, payload) {
			state.myTunes = payload;
		}
	},
	actions: {
		getMusicByArtist({ commit, dispatch }, artist) {
			commit('setGettingMusic', true)
			var url = '//bcw-getter.herokuapp.com/?url=';
			var url2 = 'https://itunes.apple.com/search?media=music&term=' + artist;
			// var url2 = 'https://api.spotify.com/v1/search?type=song&limit=50&q=' + artist; // & offset=page*50
			var apiUrl = url + encodeURIComponent(url2);
			$.ajax({
				method: 'GET',
				contentType: 'application/json',
				url: apiUrl,
				xhrFields: {
					withCredentials: false
				}
			})
				.then(data => {
					data = JSON.parse(data);
					var songList = data.results.map(song => {
						return {
							title: song.trackName,
							albumArt: song.artworkUrl100,
							artist: song.artistName,
							album: song.collectionName,
							price: song.collectionPrice,
							preview: song.previewUrl,
							link: song.trackViewUrl,
						};
					})
					commit('setResults', songList)
					commit('setGettingMusic', false)
				}).fail(err => {
					alert(err)
					commit('setGettingMusic', false);
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
			$.get(server + '/api/songs')
				.then(res => {
					commit('setMyTunes', res)
				}).fail(err => console.err(err))
		},
		addToMyTunes({ commit, dispatch }, song) {
			$.post(server + '/api/songs', song)
				.then(res => {
					dispatch('getMyTunes')
				}).fail(err => console.error(err))
		},
		removeFromMyTunes({ commit, dispatch }, song) {
			$.ajax({
				method: 'DELETE',
				contentType: 'application/json',
				url: server + '/api/songs/' + song._id
			}).then(res => {
				dispatch('getMyTunes')
			}).fail(res => console.error(res))
		},
		removesong({ commit, dispatch }, { playlist, song }) {
			//Removes song from the database with delete
		},
		promotesong({ commit, dispatch }, { playlist, song }) {
			//this should increase the position / upvotes and downvotes on the song
		},
		demotesong({ commit, dispatch }, { playlist, song }) {
			//this should decrease the position / upvotes and downvotes on the song
		},

		// USER ACTIONS
		login({ commit, dispatch }, payload) {
			$.post(server + '/login', payload)
				.then(res => {
					res.data.loggedIn = true;
					commit('setUser', res.data)
				}).fail(res => {
					alert('Invalid email or password')
				})
		},
		register({ commit, dispatch }, payload) {
			$.post(server + '/register', payload)
				.then(res => {
					res.data.loggedIn = true;
					commit('setUser', res.data)
				}).fail(res => {
					alert(res.error)
				})
		},
		logout({ commit, dispatch }) {
			$.ajax({
				method: 'DELETE',
				contentType: 'application/json',
				url: server + '/logout'
			}).then(res => {
				commit('setUser', { username: '', loggedIn: false })
			}).fail(err => alert(err))
		},
		checkForSession({ commit, dispatch }) {
			// $.ajax({
			// 	method: 'GET',
			// 	contentType: 'application/json',
			// 	url: server + '/authenticate',
			// 	xhrFields: {
			// 		withCredentials: true
			// 	}
			// })
			$.get(server + '/authenticate')
				.then(res => {
					if (res.data)
						commit('setUser', { username: res.data.username, loggedIn: true })
				})
		}
	}
})

export default store
