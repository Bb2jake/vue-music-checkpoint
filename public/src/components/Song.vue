<template>
	<div class="song">
		<div class="panel panel-default">
			<div class="action panel-heading text-center" @click="playSong">
				<h4 class="panel-title"><span class="glyphicon glyphicon-play"></span>{{song.title}}</h4>
			</div>
			<div class="song-info text-center block-center panel-body">
				<div>
					<img class="album-art" :src="song.albumArt" alt="album art">
				</div>
				<div>
					<p>Album: {{song.collection}}</p>
					<p>By: {{song.artist}}</p>
				</div>
			</div>
			<div class="price text-center">
				<button type="button" class="btn btn-primary" @click="openLink">${{song.price}}</button>
				<button v-if="$route.name == 'Home'" type="button" class="btn btn-primary" @click="addToMyTunes">Add to MyTunes</button>
				<button v-if="$route.name == 'MyTunes'" type="button" class="btn btn-primary" @click="removeFromMyTunes">Remove from MyTunes</button>
				<button v-if="$route.name == 'Playlist'" type="button" class="btn btn-primary" @click="removeFromPlaylist">Remove from Playlist</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'song',
		props: ['song'],
		data() {
			return {

			}
		},
		methods: {
			playSong() {
				// let song = document.getElementById(`audio${num}`).getElementsByTagName('audio')[0];
				// if (song.paused)
				// 	song.play();
				// else
				// 	song.pause();
			},
			openLink() {
				window.open(this.song.link)
			},
			addToMyTunes() {
				this.$store.dispatch('addToMyTunes', this.song)
			},
			removeFromMyTunes() {
				this.$store.dispatch('removeFromMyTunes', this.song)
			}
		},
		computed: {

		}
	}

</script>

<style scoped>
	.album-art {
		height: 100px;
		width: 100px;
	}

	.price {
		margin-bottom: 10px;
	}
</style>