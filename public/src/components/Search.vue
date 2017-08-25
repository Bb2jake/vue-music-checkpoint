<template>
	<div class="itunes">
		<div class="container">
			<div class="row">
				<div class=" col-xs-12 text-center">
					<form id="search-form" class="form-inline" @submit.prevent="searchForMusic">
						<div class="form-group">
							<input type="text" class="form-control" v-model="searchStr" placeholder="Artist Name" />
							<button v-show="!gettingMusic" class="btn btn-primary">GET MUSIC</button>
							<button v-show="gettingMusic" class="btn btn-primary" disabled>LOADING...</button>
						</div>
					</form>
				</div>
				<div v-for="(song, index) in songs">
					<div>
						<Song :song="song" class="col-xs-12 col-sm-6 col-md-4"></Song>
						<div v-if="(index + 1) % 3 == 0" class="clearfix hidden-sm hidden-xs"></div>
						<div v-if="(index + 1) % 2 == 0" class="clearfix visible-sm"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import Song from './Song'
	export default {
		name: 'itunes',
		components: {
			Song
		},
		data() {
			return {
				searchStr: ''
			}
		},
		methods: {
			searchForMusic() {
				if (!this.gettingMusic)
					this.$store.dispatch('getMusicByArtist', this.searchStr);
			}
		},
		computed: mapState({
			songs(state) {
				return state.results;
			},
			gettingMusic(state) {
				return state.gettingMusic;
			}
		})
	}

</script>

<style scoped>
	#search-form {
		padding: 20px 0;
	}
</style>